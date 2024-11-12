import BarChart from "../models/barChartModel.js"; // Import the BarChart model

// Controller to create a new BarChart entry
export const createBarChart = async (req, res) => {
  try {
    const { dashboardId, widgetType, selectedIds, topic } = req.body;

    // Create a new BarChart document
    const newBarChart = new BarChart({
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
export const getBarCharts = async (req, res) => {
  try {
    const barCharts = await BarChart.find() // Optionally populate dashboard data
    res.status(200).json(barCharts); // Send the list of all BarCharts
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a BarChart by ID
export const getBarChartById = async (req, res) => {
  try {
    const { id } = req.params;
    const barChart = await BarChart.findById(id)
    if (!barChart) {
      return res.status(404).json({ message: "BarChart not found" });
    }

    res.status(200).json(barChart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a BarChart by ID
export const updateBarChart = async (req, res) => {
  try {
    const { id } = req.params;
    const { dashboardId, widgetType, selectedIds, topic } = req.body;

    // Find the BarChart by ID and update it with the new data
    const updatedBarChart = await BarChart.findByIdAndUpdate(
      id,
      { dashboardId, widgetType, selectedIds, topic },
      { new: true } // Return the updated document
    );

    if (!updatedBarChart) {
      return res.status(404).json({ message: "BarChart not found" });
    }

    res.status(200).json(updatedBarChart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a BarChart by ID
export const deleteBarChart = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the BarChart by ID and delete it
    const deletedBarChart = await BarChart.findByIdAndDelete(id);

    if (!deletedBarChart) {
      return res.status(404).json({ message: "BarChart not found" });
    }

    res.status(200).json({ message: "BarChart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};