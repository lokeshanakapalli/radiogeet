import express from "express";
import {
createLineChart,
deleteLineChart,getLineChartById,getLineCharts,updateLineChart
} from "../controllers/linechartController.js";

const router = express.Router();

router.post("/", createLineChart); // Create BarChart
router.get("/", getLineCharts); // Get all BarCharts
router.get("/:id", getLineChartById); // Get BarChart by ID
router.put("/:id", updateLineChart); // Update BarChart by ID
router.delete("/:id", deleteLineChart); // Delete BarChart by ID

export default router;
