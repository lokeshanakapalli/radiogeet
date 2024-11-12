import mongoose from "mongoose";

// Define the Battery schema
const progressionSchema = new mongoose.Schema({
  dashboardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dashboard", // Assuming you have a Dashboard model
    required: true,
  },
  widgetType: {
    type: String,
    enum: ["progression"], // Specify the widget type for clarity
    required: true,
  },
  progression: {
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
const Progression = mongoose.model("Progression", progressionSchema);

export default Progression;
