import mongoose from "mongoose";

// Define the Alert schema
const alertSchema = new mongoose.Schema({
  setPoint: {
    type: Number,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  devicetag: {
    type: String, // Reference to the Battery model
    required: true
  },
  topic: {
    type: String, // Storing the topic from the Battery model
    required: true
  },
  type: {
    type: String, // Storing the topic from the Battery model
    required: true
  }
});

// Create the Alert model from the schema
const Alert = mongoose.model("Alert", alertSchema);

export default Alert;
