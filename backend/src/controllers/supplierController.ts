import { Request, Response } from "express";
import Supplier from "../models/supplierSchema";

export const getAllSuppliers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch suppliers", error });
  }
};

// Add a new supplier
export const createSupplier = async (req: Request, res: Response): Promise<void> => {
  const { name, contactPerson, phone, email, address, products } = req.body;
  try {
    const newSupplier = new Supplier({ name, contactPerson, phone, email, address, products });
    await newSupplier.save();
    res.status(201).json({ message: "Supplier created successfully", supplier: newSupplier });
  } catch (error) {
    res.status(500).json({ message: "Failed to create supplier", error });
  }
};

// Update an existing supplier
export const updateSupplier = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, contactPerson, phone, email, address, products } = req.body;
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(id, { name, contactPerson, phone, email, address, products }, { new: true });
    if (!updatedSupplier) {
      res.status(404).json({ message: "Supplier not found" });
      return;
    }
    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ message: "Failed to update supplier", error });
  }
};

// Delete a supplier
export const deleteSupplier = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(id);
    if (!deletedSupplier) {
      res.status(404).json({ message: "Supplier not found" });
      return;
    }
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete supplier", error });
  }
};
