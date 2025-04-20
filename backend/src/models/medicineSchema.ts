import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: String,
  category: String,
  batchNumber: String,
  expiryDate: Date,
  quantity: Number,
  price: Number,
  unitsSold: Number,
  createdAt: { type: Date, default: Date.now },
});

const Medicine = mongoose.models.Medicine || mongoose.model("Medicine", medicineSchema);

export { Medicine };
