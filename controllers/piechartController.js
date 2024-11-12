import PieChart from "../models/pieChartModel.js"; // Import the BarChart model

// Controller to create a new BarChart entry
export const createPieChart = async (req, res) => {
  try {
    const { dashboardId, widgetType, selectedIds, topic } = req.body;

    // Create a new BarChart document
    const newPieChart = new PieChart({
      dashboardId,
      widgetType,
      selectedIds,
      topic,
    });

    // Save the new BarChart to the database
    const savedPieChart = await newPieChart.save();
    res.status(201).json(savedPieChart); // Send a success response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get all BarChart entries
export const getPieCharts = async (req, res) => {
  try {
    const pieCharts = await PieChart.find() // Optionally populate dashboard data
    res.status(200).json(pieCharts); // Send the list of all BarCharts
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a BarChart by ID
export const getPieChartById = async (req, res) => {
  try {
    const { id } = req.params;
    const barChart = await PieChart.findById(id)
    if (!barChart) {
      return res.status(404).json({ message: "PieChart not found" });
    }

    res.status(200).json(barChart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a BarChart by ID
export const updatePieChart = async (req, res) => {
  try {
    const { id } = req.params;
    const { dashboardId, widgetType, selectedIds, topic } = req.body;

    // Find the BarChart by ID and update it with the new data
    const updatedBarChart = await PieChart.findByIdAndUpdate(
      id,
      { dashboardId, widgetType, selectedIds, topic },
      { new: true } // Return the updated document
    );

    if (!updatedBarChart) {
      return res.status(404).json({ message: "PieChart not found" });
    }

    res.status(200).json(updatedBarChart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a BarChart by ID
export const deletePieChart = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the BarChart by ID and delete it
    const deletedBarChart = await PieChart.findByIdAndDelete(id);

    if (!deletedBarChart) {
      return res.status(404).json({ message: "Piechart not found" });
    }

    res.status(200).json({ message: "Piechart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};