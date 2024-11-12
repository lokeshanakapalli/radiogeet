import MqttData from "../models/mqttDataModel.js";

// Save MQTT data to the database
export const saveMqttData = async (topic, message) => {
  try {
    const mqttData = new MqttData({ topic, message });
    await mqttData.save();
    console.log("MQTT data saved successfully");
  } catch (error) {
    console.error("Error saving MQTT data:", error);
  }
};

// Get all MQTT data from the database
export const getAllMqttData = async (req, res) => {
  try {
    const data = await MqttData.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving MQTT data", error });
  }
};

// Get the latest MQTT data for a specific topic
export const getLatest = async (req, res) => {
  const { topic } = req.query;
  try {
    const latestData = await MqttData.findOne({ topic }).sort({
      createdAt: -1,
    });
    res.json(latestData ? [latestData] : []); // Return as an array for consistency
  } catch (error) {
    res.status(500).json({ message: "Error fetching MQTT data", error });
  }
};

// Get MQTT data by topic
export const getMqttDataByTopic = async (req, res) => {
  const { topic } = req.params;
  try {
    const data = await MqttData.find({ topic }).sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving MQTT data", error });
  }
};
