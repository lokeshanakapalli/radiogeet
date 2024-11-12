import Battery from "../models/progressionModel.js"; // Adjust the import path as necessary

// Create a new battery widget
export const createProgressionWidget = async (req, res) => {
  const { dashboardId, progression, topic } = req.body;

  // Validate input
  if (progression < 0 || progression > 100) {
    return res.status(400).json({ message: "Progression level must be between 0 and 100." });
  }

  try {
    const newBatteryWidget = new Battery({
      dashboardId,
      widgetType: "progression",
      progression,
      topic, // Added topic
    });

    await newBatteryWidget.save();
    res.status(201).json({
      message: "Progression widget created successfully",
      data: newBatteryWidget,
    });
  } catch (error) {
    console.error("Error creating progression widget:", error);
    res.status(500).json({ message: "Error creating progression widget", error: error.message });
  }
};

// Retrieve all battery widgets
export const getProgressionWidgets = async (req, res) => {
  try {
    // Retrieve all battery widgets
    const batteryWidgets = await Battery.find().exec();

    // Respond with all battery widget data
    res.status(200).json({
      message: "All progression widgets retrieved successfully",
      data: batteryWidgets.length > 0 ? batteryWidgets : [], // Return an empty array if no widgets found
      count: batteryWidgets.length, // Include a count of the widgets found
    });
  } catch (error) {
    console.error("Error retrieving progression widgets:", error);
    res.status(500).json({ message: "Error retrieving progression widgets", error: error.message });
  }
};

// Update a battery widget
export const updateProgressionWidget = async (req, res) => {
  const { id } = req.params; // Battery widget ID from the request parameters
  const { progression, topic } = req.body; // Include new fields

  // Validate input
  if (batteryLevel < 0 || batteryLevel > 100) {
    return res.status(400).json({ message: "progression level must be between 0 and 100." });
  }

  try {
    const updatedBatteryWidget = await Battery.findByIdAndUpdate(
      id,
      { progression, topic }, // Update with new fields
      { new: true } // Return the updated document
    );

    if (!updatedBatteryWidget) {
      return res.status(404).json({ message: "Battery widget not found." });
    }

    res.status(200).json({
      message: "progression widget updated successfully",
      data: updatedBatteryWidget,
    });
  } catch (error) {
    console.error("Error updating progression widget:", error);
    res.status(500).json({ message: "Error updating progression widget", error: error.message });
  }
};

// Delete a battery widget
export const deleteProgressionWidget = async (req, res) => {
  const { id } = req.params; // Battery widget ID from the request parameters

  try {
    const deletedBatteryWidget = await Battery.findByIdAndDelete(id);

    if (!deletedBatteryWidget) {
      return res.status(404).json({ message: "progression widget not found." });
    }

    res.status(200).json({
      message: "progression widget deleted successfully",
      data: deletedBatteryWidget,
    });
  } catch (error) {
    console.error("Error deleting progression widget:", error);
    res.status(500).json({ message: "Error deleting progression widget", error: error.message });
  }
};
