import express from "express";
import {
  createBarChart,
  getBarCharts,
  getBarChartById,
  updateBarChart,
  deleteBarChart,
} from "../controllers/barchartController.js";

const router = express.Router();

router.post("/", createBarChart); // Create BarChart
router.get("/", getBarCharts); // Get all BarCharts
router.get("/:id", getBarChartById); // Get BarChart by ID
router.put("/:id", updateBarChart); // Update BarChart by ID
router.delete("/:id", deleteBarChart); // Delete BarChart by ID

export default router;
