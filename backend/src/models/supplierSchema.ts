import mongoose, { Schema, Document } from "mongoose";

export interface ISupplier extends Document {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  products: number;
}

const supplierSchema = new Schema<ISupplier>({
  name: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  products: { type: Number, required: true },
}, { timestamps: true });

const Supplier = mongoose.model<ISupplier>("Supplier", supplierSchema);

export default Supplier;
