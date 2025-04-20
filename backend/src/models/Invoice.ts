import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema({
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
  quantity: Number,
  price: Number,
  total: Number,
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  date: String,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  items: [invoiceItemSchema],
  subtotal: Number,
  tax: Number,
  total: Number,
  paymentMethod: String,
});

export default mongoose.model("Invoice", invoiceSchema);
