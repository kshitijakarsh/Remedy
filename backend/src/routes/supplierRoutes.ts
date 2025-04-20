import express from "express";
import { getAllSuppliers, createSupplier, updateSupplier, deleteSupplier } from "../controllers/supplierController";

const router = express.Router();

// Get all suppliers
router.get("/suppliers", getAllSuppliers);

// Add a new supplier
router.post("/suppliers", createSupplier);

// Update a supplier by ID
router.put("/suppliers/:id", updateSupplier);

// Delete a supplier by ID
router.delete("/suppliers/:id", deleteSupplier);

export default router;
