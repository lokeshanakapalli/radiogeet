import express from 'express'
import {createProgressionWidget,deleteProgressionWidget,getProgressionWidgets,updateProgressionWidget} from '../controllers/progressionController.js'

const router = express.Router()

router.post("/", createProgressionWidget);
router.get("/", getProgressionWidgets);
router.put("/:id", updateProgressionWidget);
router.delete("/:id",deleteProgressionWidget);

export default router