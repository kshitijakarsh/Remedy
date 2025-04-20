import { Request, Response } from "express";
import Medicine from "../models/medicineSchema";

export const createMedicine = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      name,
      description,
      batchNumber,
      expiryDate,
      quantity,
      price,
      reorderLevel,
      supplier,
    } = req.body;

    if (
      !name ||
      !batchNumber ||
      !expiryDate ||
      quantity == null ||
      price == null ||
      reorderLevel == null ||
      !supplier
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    const newMedicine = new Medicine({
      name,
      description,
      batchNumber,
      expiryDate,
      quantity,
      price,
      reorderLevel,
      supplier,
    });

    await newMedicine.save();

    return res.status(201).json({
      message: "Medicine created successfully!",
      medicine: newMedicine,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while creating medicine." });
  }
};

export const getAllMedicines = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const medicines = await Medicine.find();
    return res.status(200).json(medicines);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while fetching medicines." });
  }
};

export const getMedicineById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found." });
    }

    return res.status(200).json(medicine);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while fetching medicine." });
  }
};

export const updateMedicine = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      name,
      description,
      batchNumber,
      expiryDate,
      quantity,
      price,
      reorderLevel,
      supplier,
    } = req.body;

    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        batchNumber,
        expiryDate,
        quantity,
        price,
        reorderLevel,
        supplier,
      },
      { new: true }
    );

    if (!updatedMedicine) {
      return res.status(404).json({ message: "Medicine not found." });
    }

    return res.status(200).json({
      message: "Medicine updated successfully!",
      medicine: updatedMedicine,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while updating medicine." });
  }
};

export const deleteMedicine = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);

    if (!deletedMedicine) {
      return res.status(404).json({ message: "Medicine not found." });
    }

    return res.status(200).json({ message: "Medicine deleted successfully!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while deleting medicine." });
  }
};
