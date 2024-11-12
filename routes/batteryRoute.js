import express from 'express'
import {createBatteryWidget,deleteBatteryWidget,getBatteryWidgets,updateBatteryWidget,} from '../controllers/batteryController.js'

const router = express.Router()

router.post("/", createBatteryWidget);
router.get("/", getBatteryWidgets);
router.put("/:id", updateBatteryWidget);
router.delete("/:id",deleteBatteryWidget);

export default router