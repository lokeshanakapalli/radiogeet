
import AreaChart from "../models/areaChartModel.js";// Import the BarChart model

// Controller to create a new BarChart entry
export const createAreaChart = async (req, res) => {
  try {
    const { dashboardId, widgetType, selectedIds, topic } = req.body;

    // Create a new BarChart document
    const newBarChart = new AreaChart({
      dashboardId,
      widgetType,
      selectedIds,
      topic,
    });

    // Save the new BarChart to the database
    const savedBarChart = await newBarChart.save();
    res.status(201).json(savedBarChart); // Send a success response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get all BarChart entries
export const getAreaCharts = async (req, res) => {
  try {
    const barCharts = await AreaChart.find() // Optionally populate dashboard data
    res.status(200).json(barCharts); // Send the list of all BarCharts
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a BarChart by ID
export const getAreaChartById = async (req, res) => {
  try {
    const { id } = req.params;
    const barChart = await AreaChart.findById(id)
    if (!barChart) {
      return res.status(404).json({ message: "Areachart not found" });
    }

    res.status(200).json(barChart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a BarChart by ID
export const updateAreaChart = async (req, res) => {
  try {
    const { id } = req.params;
    const { dashboardId, widgetType, selectedIds, topic } = req.body;

    // Find the BarChart by ID and update it with the new data
    const updatedBarChart = await AreaChart.findByIdAndUpdate(
      id,
      { dashboardId, widgetType, selectedIds, topic },
      { new: true } // Return the updated document
    );

    if (!updatedBarChart) {
      return res.status(404).json({ message: "AreaChart not found" });
    }

    res.status(200).json(updatedBarChart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a BarChart by ID
export const deleteAreaChart = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the BarChart by ID and delete it
    const deletedBarChart = await AreaChart.findByIdAndDelete(id);

    if (!deletedBarChart) {
      return res.status(404).json({ message: "Areachart not found" });
    }

    res.status(200).json({ message: "Areachart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};