import mongoose, { Document, Schema } from 'mongoose';

export interface ISaleItem {
  medicineId: mongoose.Types.ObjectId;
  medicineName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ISale extends Document {
  customerId: mongoose.Types.ObjectId;
  paymentMethod: string;
  items: ISaleItem[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: Date;
}

const saleItemSchema = new Schema<ISaleItem>({
  medicineId: { type: Schema.Types.ObjectId, ref: 'Medicine', required: true },
  medicineName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
});

const saleSchema = new Schema<ISale>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    paymentMethod: { type: String, required: true },
    items: [saleItemSchema],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const Sale = mongoose.model<ISale>('Sale', saleSchema);
export default Sale;
