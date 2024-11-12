import express from "express";
import {
  getAllMqttData,
  getMqttDataByTopic,
  getLatest,
  getLast2000MqttData
} from "../controllers/mqttDataController2.js";

const router = express.Router();

// Get all MQTT data
router.get("/get", getAllMqttData);

// Get MQTT data by topic
router.get("/:topic", getMqttDataByTopic);

// Get the latest MQTT data for a specific topic
router.get("/latest", getLatest);

router.get('/',getLast2000MqttData)

export default router;
