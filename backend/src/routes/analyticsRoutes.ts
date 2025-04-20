import { Router } from "express";
import {
  getMonthlySales,
  getSalesByCategory,
  getTopSelling,
  getExpiringSoon,
  getInventoryTrends,
} from "../controllers/analyticsController";

const router = Router();

router.get("/monthly-sales", getMonthlySales);
router.get("/sales-by-category", getSalesByCategory);
router.get("/top-selling", getTopSelling);
router.get("/expiring-medicines", getExpiringSoon);
router.get("/inventory-trends", getInventoryTrends);

export default router;
