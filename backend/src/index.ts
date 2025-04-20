import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes"
import customerRoutes from "./routes/customerRoutes"
import medicineRoutes from "./routes/medicineRoutes"
import analyticsRoutes from "./routes/analyticsRoutes"
import saleRoutes from "./routes/saleRoutes"
import supplierRoutes from "./routes/supplierRoutes"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL
if (!MONGO_URL) {
    throw new Error("JWT secret is not defined in environment variables");
  }

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes)
app.use("/api/medicines", medicineRoutes)
app.use("/api/analytics", analyticsRoutes);
app.use("/api/sale", saleRoutes)
app.use("/api", supplierRoutes);


app.listen(3000, () => console.log("Server running on port 3000"));
