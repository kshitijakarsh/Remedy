// controllers/saleController.ts
import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Sale from "../models/saleSchema";
import { Medicine } from "../models/medicineSchema";
import Customer from "../models/customerSchema";

// Define interfaces for SaleItem and Customer for type safety
interface SaleItem {
  medicineId: ObjectId;
  medicineName: string;
  quantity: number;
  price: number;
  total: number;
}

interface Customer {
  name: string;
  address: string;
  phone: string;
}

// Create a new sale
export const createNewSale = async (
  req: Request,
  res: Response
): Promise<any> => {
  const {
    customerId,
    paymentMethod,
    items,
    subtotal,
    tax,
    total,
  }: {
    customerId: string;
    paymentMethod: string;
    items: SaleItem[];
    subtotal: number;
    tax: number;
    total: number;
  } = req.body;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
    }

    // Loop through the items and check stock for each medicine
    for (let item of items) {
      const medicine = await Medicine.findById(item.medicineId);
      if (!medicine) {
        return res
          .status(400)
          .json({ message: `Medicine not found: ${item.medicineName}` });
      }

      // Check if there is enough stock
      if (medicine.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${medicine.name}` });
      }

      // Decrease the stock for the medicine
      medicine.stock -= item.quantity;
      await medicine.save();
    }

    // Create a new sale document
    const newSale = new Sale({
      customerId,
      paymentMethod,
      items,
      subtotal,
      tax,
      total,
    });

    await newSale.save();

    // Respond with success
    res
      .status(201)
      .json({ message: "Sale created successfully", sale: newSale });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create sale", error: err });
  }
};

// Fetch all customers
export const getAllCustomers = async (
  _req: Request,
  res: Response
): Promise<any> => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch customers", error: err });
  }
};

// Fetch all medicines
export const getAllMedicines = async (
  _req: Request,
  res: Response
): Promise<any> => {
  try {
    const medicines = await Medicine.find();
    res.status(200).json(medicines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch medicines", error: err });
  }
};

export const getAllSales = async (req: Request, res: Response) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch sales" });
  }
};
