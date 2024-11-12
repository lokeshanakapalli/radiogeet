import express from "express";
import {
  getAllMqttData,
  getMqttDataByTopic,
  getLatest,
} from "../controllers/mqttDataController.js";

const router = express.Router();

// Get all MQTT data
router.get("/", getAllMqttData);

// Get MQTT data by topic
router.get("/:topic", getMqttDataByTopic);

// Get the latest MQTT data for a specific topic
router.get("/latest", getLatest);

export default router;
