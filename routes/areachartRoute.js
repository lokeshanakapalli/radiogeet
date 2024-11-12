import express from "express";
import {
    createAreaChart,deleteAreaChart,getAreaChartById,getAreaCharts,updateAreaChart
} from "../controllers/areachartController.js";

const router = express.Router();

router.post("/", createAreaChart); // Create BarChart
router.get("/", getAreaCharts); // Get all BarCharts
router.get("/:id", getAreaChartById); // Get BarChart by ID
router.put("/:id", updateAreaChart); // Update BarChart by ID
router.delete("/:id", deleteAreaChart); // Delete BarChart by ID

export default router;
