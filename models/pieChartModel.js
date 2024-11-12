import mongoose from "mongoose";

// Define the BarChart schema
const pieChartSchema = new mongoose.Schema({
  dashboardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dashboard", // Assuming you have a Dashboard model
    required: true,
  },
  widgetType: {
    type: String,
    enum: ["pieChart"], // Specify the widget type, especially for BarChart
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
const PieChart = mongoose.model("PieChart", pieChartSchema);

export default PieChart;
