import mongoose from "mongoose";

// Define the Battery schema
const batterySchema = new mongoose.Schema({
  dashboardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dashboard", // Assuming you have a Dashboard model
    required: true,
  },
  name : {
    type : String,
    required : true
  },
  widgetType: {
    type: String,
    enum: ["batteryLevel"], // Specify the widget type for clarity
    required: true,
  },
  batteryLevel: {
    type: String,
    required: true,
    min: 0,
    max: 100,
  },
 
  topic: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
const Battery = mongoose.model("Battery", batterySchema);

export default Battery;
