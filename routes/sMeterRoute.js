import express from 'express';
import {
    createSpeedMeterWidget,
    getSpeedMeterWidgets,
    updateSpeedMeterWidget,
    deleteSpeedMeterWidget
} from '../controllers/smeterController.js'; // Adjust the import path as necessary

const router = express.Router();

// Define routes for the SpeedMeter
router.post('/', createSpeedMeterWidget);           // Create a new SpeedMeter widget
router.get('/', getSpeedMeterWidgets);               // Get all SpeedMeter widgets
router.put('/:id', updateSpeedMeterWidget);          // Update a SpeedMeter widget by ID
router.delete('/:id', deleteSpeedMeterWidget);       // Delete a SpeedMeter widget by ID

export default router;
