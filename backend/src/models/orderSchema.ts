import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  batchNumber: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  reorderLevel: { type: Number, required: true },
  supplier: { type: String, required: true },
}, );

const Order = mongoose.model("Medicine", orderSchema);
export default Order;
