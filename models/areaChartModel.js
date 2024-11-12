import mongoose from "mongoose";

// Define the BarChart schema
const areaChartSchema = new mongoose.Schema({
  dashboardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dashboard", // Assuming you have a Dashboard model
    required: true,
  },
  widgetType: {
    type: String,
    enum: ["areaChart"], // Specify the widget type, especially for BarChart
    required: true,
  },
  selectedIds: [
    {
      type: String,
      required: true,
    },
  ],
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
const AreaChart = mongoose.model("AreaChart", areaChartSchema);

export default AreaChart;
