import mongoose from "mongoose";

// Define the schema for storing MQTT data
const mqttDataSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true } 
);

// Create the model
const MqttData = mongoose.model("MqttData", mqttDataSchema);

export default MqttData;
