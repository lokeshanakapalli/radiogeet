import mongoose from "mongoose";

// Define the Battery schema
const speedMeterSchema = new mongoose.Schema({
  dashboardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dashboard", // Assuming you have a Dashboard model
    required: true,
  },
  widgetType: {
    type: String,
    enum: ["speedmeter"], // Specify the widget type for clarity
    required: true,
  },
  speedMeter: {
    type: String,
    required: true,
  },
  min : {
    type : Number,
    required : false
  },
  max : {
    type : Number,
    required : false
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
const SpeedMeterSchema = mongoose.model("SpeedoMeter", speedMeterSchema);

export default SpeedMeterSchema;
