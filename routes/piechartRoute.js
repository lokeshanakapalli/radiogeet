import express from "express";
import {
 createPieChart,deletePieChart,getPieChartById,updatePieChart,getPieCharts
} from "../controllers/piechartController.js";

const router = express.Router();

router.post("/", createPieChart); // Create BarChart
router.get("/", getPieCharts); // Get all BarCharts
router.get("/:id", getPieChartById); // Get BarChart by ID
router.put("/:id", updatePieChart); // Update BarChart by ID
router.delete("/:id", deletePieChart); // Delete BarChart by ID

export default router;
