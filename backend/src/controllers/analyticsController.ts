import { Request, Response } from "express";
import { Medicine } from "../models/medicineSchema";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const getMonthlySales = async (_: Request, res: Response) => {
  try {
    const result = await Medicine.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: { $multiply: ["$unitsSold", "$price"] } },
        },
      },
      {
        $addFields: {
          month: {
            $arrayElemAt: [months, { $subtract: ["$_id", 1] }],
          },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // Directly return the formatted result
    const formatted = result.map((item) => ({
      name: item.month,
      total: item.total,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error in getMonthlySales:", err);
    res.status(500).json({ message: "Failed to fetch monthly sales" });
  }
};

export const getSalesByCategory = async (_: Request, res: Response) => {
  try {
    const result = await Medicine.aggregate([
      {
        $group: {
          _id: "$category",
          value: { $sum: "$unitsSold" },
        },
      },
    ]);

    const formatted = result.map((item) => ({
      name: item._id,
      value: item.value,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error in getSalesByCategory:", err);
    res.status(500).json({ message: "Failed to fetch category sales" });
  }
};

export const getTopSelling = async (_: Request, res: Response) => {
  try {
    const result = await Medicine.find({})
      .sort({ unitsSold: -1 })
      .limit(5);

    const formatted = result.map((med) => ({
      id: med._id,
      name: med.name,
      category: med.category,
      unitsSold: med.unitsSold,
      revenue: (med.unitsSold ?? 0) * (med.price ?? 0),
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error in getTopSelling:", err);
    res.status(500).json({ message: "Failed to fetch top selling" });
  }
};

export const getExpiringSoon = async (_: Request, res: Response) => {
  try {
    const today = new Date();
    const in60Days = new Date();
    in60Days.setDate(today.getDate() + 60);

    const result = await Medicine.find({
      expiryDate: { $gte: today, $lte: in60Days },
    });

    const formatted = result.map((med) => ({
      id: med._id,
      name: med.name,
      batchNumber: med.batchNumber,
      quantity: med.quantity,
      expiryDate: med.expiryDate?.toISOString().split("T")[0] ?? "N/A",
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error in getExpiringSoon:", err);
    res.status(500).json({ message: "Failed to fetch expiring medicines" });
  }
};

// Get Inventory Trends (Monthly Quantity)
export const getInventoryTrends = async (_: Request, res: Response) => {
  try {
    const result = await Medicine.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$quantity" },
        },
      },
      {
        $addFields: {
          month: {
            $arrayElemAt: [months, { $subtract: ["$_id", 1] }],
          },
        },
      },
    ]);

    const formatted = result.map((item) => ({
      name: item.month,
      total: item.total,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error in getInventoryTrends:", err);
    res.status(500).json({ message: "Failed to fetch inventory trends" });
  }
};
