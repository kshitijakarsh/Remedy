import { Request, Response } from "express";
import Customer from "../models/customerSchema";

const handleError = (res: Response, message: string, statusCode: number) => {
  return res.status(statusCode).json({ error: message });
};

export const createCustomer = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, phone, email, address, totalPurchases, lastVisit } = req.body;

    const customer = new Customer({
      name,
      phone,
      email,
      address,
      totalPurchases,
      lastVisit: new Date(lastVisit),
    });

    await customer.save();
    return res
      .status(201)
      .json({ message: "Customer created successfully", customer });
  } catch (error) {
    console.error(error);
    return handleError(res, "Failed to create customer", 500);
  }
};

export const getAllCustomers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const customers = await Customer.find();
    return res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    return handleError(res, "Failed to fetch customers", 500);
  }
};

export const getCustomerById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return handleError(res, "Customer not found", 404);
    }
    return res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    return handleError(res, "Failed to fetch customer", 500);
  }
};

export const updateCustomer = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { name, phone, email, address, totalPurchases, lastVisit } = req.body;

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return handleError(res, "Customer not found", 404);
    }

    customer.name = name || customer.name;
    customer.phone = phone || customer.phone;
    customer.email = email || customer.email;
    customer.address = address || customer.address;
    customer.totalPurchases = totalPurchases || customer.totalPurchases;
    customer.lastVisit = new Date(lastVisit) || customer.lastVisit;

    await customer.save();
    return res
      .status(200)
      .json({ message: "Customer updated successfully", customer });
  } catch (error) {
    console.error(error);
    return handleError(res, "Failed to update customer", 500);
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return handleError(res, "Customer not found", 404);
    }

    await Customer.deleteOne({ _id: id });

    return res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    return handleError(res, "Failed to delete customer", 500);
  }
};
