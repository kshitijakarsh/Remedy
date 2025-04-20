import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  totalPurchases: { type: Number, default: 0 },
  lastVisit: { type: Date, required: true },
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
