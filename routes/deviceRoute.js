// routes/deviceRoutes.js
import express from "express";
import { createDevice, getDevices,checkTopicUnique,updateDevice,deleteDevice } from "../controllers/deviceController.js";

const router = express.Router();

// Create a new device
router.post("/", createDevice);

// Get all devices
router.get("/", getDevices);

router.get('/check-topic', checkTopicUnique)

router.put('/:id',updateDevice)

router.delete('/:id',deleteDevice)
// Get a device by ID
// router.get("/:id", getDeviceById);

// Update a device by ID
// router.put("/:id", updateDevice);

// Delete a device by ID
// router.delete("/:id", deleteDevice);

export default router;
