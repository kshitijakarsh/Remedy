import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Sale from "../models/saleSchema";
import { Medicine } from "../models/medicineSchema";
import Customer from "../models/customerSchema";
import Invoice from "../models/invoice";

interface SaleItem {
  medicineId: ObjectId;
  medicineName: string;
  quantity: number;
  price: number;
  total: number;
}

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

    for (let item of items) {
      const medicine = await Medicine.findById(item.medicineId);
      if (!medicine) {
        return res
          .status(400)
          .json({ message: `Medicine not found: ${item.medicineName}` });
      }

      if (medicine.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${medicine.name}` });
      }

      medicine.stock -= item.quantity;
      await medicine.save();
    }

    const newSale = new Sale({
      customerId,
      paymentMethod,
      items,
      subtotal,
      tax,
      total,
    });

    await newSale.save();
    res
      .status(201)
      .json({ message: "Sale created successfully", sale: newSale });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create sale", error: err });
  }
};

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

export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findById(id)
      .populate("customer")
      .populate("items.medicine");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const formattedInvoice = {
      id: invoice._id,
      invoiceNumber: invoice.invoiceNumber,
      date: invoice.date,
      customer: {
        name: invoice.customer?.name ?? "N/A",  // Use nullish coalescing (??) to fallback to "N/A" if it's null or undefined
        address: invoice.customer?.address ?? "N/A",
        phone: invoice.customer?.phone ?? "N/A",
      }
      

      items: invoice.items.map((item) => ({
        id: item._id,
        name: (item.medicine as any)?.name || "Unknown Medicine",
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      })),

      subtotal: invoice.subtotal,
      tax: invoice.tax,
      total: invoice.total,
      paymentMethod: invoice.paymentMethod,
    };

    res.json(formattedInvoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ message: "Server error" });
  }
};
