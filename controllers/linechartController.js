
import LineChart from "../models/lineChartModel.js"; // Import the BarChart model

// Controller to create a new BarChart entry
export const createLineChart = async (req, res) => {
  try {
    const { dashboardId, widgetType, selectedIds, topic } = req.body;

    // Create a new BarChart document
    const newBarChart = new LineChart({
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
export const getLineCharts = async (req, res) => {
  try {
    const barCharts = await LineChart.find() // Optionally populate dashboard data
    res.status(200).json(barCharts); // Send the list of all BarCharts
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a BarChart by ID
export const getLineChartById = async (req, res) => {
  try {
    const { id } = req.params;
    const barChart = await LineChart.findById(id)
    if (!barChart) {
      return res.status(404).json({ message: "Linechart not found" });
    }

    res.status(200).json(barChart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a BarChart by ID
export const updateLineChart = async (req, res) => {
  try {
    const { id } = req.params;
    const { dashboardId, widgetType, selectedIds, topic } = req.body;

    // Find the BarChart by ID and update it with the new data
    const updatedBarChart = await LineChart.findByIdAndUpdate(
      id,
      { dashboardId, widgetType, selectedIds, topic },
      { new: true } // Return the updated document
    );

    if (!updatedBarChart) {
      return res.status(404).json({ message: "LineChart not found" });
    }

    res.status(200).json(updatedBarChart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a BarChart by ID
export const deleteLineChart = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the BarChart by ID and delete it
    const deletedBarChart = await LineChart.findByIdAndDelete(id);

    if (!deletedBarChart) {
      return res.status(404).json({ message: "Linechart not found" });
    }

    res.status(200).json({ message: "Linechart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};