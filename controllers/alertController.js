import Alert from "../models/alertModel.js";

// Create a new alert
export const createAlert = async (req, res) => {
    const { setPoint, message, devicetag, topic, type } = req.body;

    if (!devicetag) {
        return res.status(400).json({ message: "Device tag is required." });
    }
    
    try {
        const newAlert = new Alert({
            setPoint,
            message,
            devicetag,
            topic,
            type
        });

        const savedAlert = await newAlert.save();
        res.status(201).json(savedAlert);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all alerts
export const getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find();
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single alert by ID
export const getAlertById = async (req, res) => {
    const { id } = req.params;

    try {
        const alert = await Alert.findById(id);

        if (!alert) return res.status(404).json({ message: "Alert not found" });

        res.status(200).json(alert);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an alert by ID
export const updateAlert = async (req, res) => {
    const { id } = req.params;
    const { setPoint, message, devicetag, topic, type } = req.body;

    try {
        const updatedAlert = await Alert.findByIdAndUpdate(id, {
            setPoint,
            message,
            devicetag,
            topic,
            type
        }, { new: true });

        if (!updatedAlert) return res.status(404).json({ message: "Alert not found" });

        res.status(200).json(updatedAlert);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an alert by ID
export const deleteAlert = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAlert = await Alert.findByIdAndDelete(id);
        if (!deletedAlert) return res.status(404).json({ message: "Alert not found" });

        res.status(200).json({ message: "Alert deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
