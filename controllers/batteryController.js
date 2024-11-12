import Battery from "../models/batteryModel.js"; // Adjust the import path as necessary

// Create a new battery widget
export const createBatteryWidget = async (req, res) => {
  const { dashboardId, batteryLevel, topic,name } = req.body;

  // Validate input
  if (batteryLevel < 0 || batteryLevel > 100) {
    return res.status(400).json({ message: "Battery level must be between 0 and 100." });
  }

  try {
    const newBatteryWidget = new Battery({
      dashboardId,
      widgetType: "batteryLevel",
      batteryLevel,
      topic, // Added topic
      name
    });

    await newBatteryWidget.save();
    res.status(201).json({
      message: "Battery widget created successfully",
      data: newBatteryWidget,
    });
  } catch (error) {
    console.error("Error creating battery widget:", error);
    res.status(500).json({ message: "Error creating battery widget", error: error.message });
  }
};

// Retrieve all battery widgets
export const getBatteryWidgets = async (req, res) => {
  try {
    // Retrieve all battery widgets
    const batteryWidgets = await Battery.find().exec();

    // Respond with all battery widget data
    res.status(200).json({
      message: "All battery widgets retrieved successfully",
      data: batteryWidgets.length > 0 ? batteryWidgets : [], // Return an empty array if no widgets found
      count: batteryWidgets.length, // Include a count of the widgets found
    });
  } catch (error) {
    console.error("Error retrieving battery widgets:", error);
    res.status(500).json({ message: "Error retrieving battery widgets", error: error.message });
  }
};

// Update a battery widget
export const updateBatteryWidget = async (req, res) => {
  const { id } = req.params; // Battery widget ID from the request parameters
  const { batteryLevel, topic } = req.body; // Include new fields

  // Validate input
  if (batteryLevel < 0 || batteryLevel > 100) {
    return res.status(400).json({ message: "Battery level must be between 0 and 100." });
  }

  try {
    const updatedBatteryWidget = await Battery.findByIdAndUpdate(
      id,
      { batteryLevel, topic }, // Update with new fields
      { new: true } // Return the updated document
    );

    if (!updatedBatteryWidget) {
      return res.status(404).json({ message: "Battery widget not found." });
    }

    res.status(200).json({
      message: "Battery widget updated successfully",
      data: updatedBatteryWidget,
    });
  } catch (error) {
    console.error("Error updating battery widget:", error);
    res.status(500).json({ message: "Error updating battery widget", error: error.message });
  }
};

// Delete a battery widget
export const deleteBatteryWidget = async (req, res) => {
  const { id } = req.params; // Battery widget ID from the request parameters

  try {
    const deletedBatteryWidget = await Battery.findByIdAndDelete(id);

    if (!deletedBatteryWidget) {
      return res.status(404).json({ message: "Battery widget not found." });
    }

    res.status(200).json({
      message: "Battery widget deleted successfully",
      data: deletedBatteryWidget,
    });
  } catch (error) {
    console.error("Error deleting battery widget:", error);
    res.status(500).json({ message: "Error deleting battery widget", error: error.message });
  }
};
