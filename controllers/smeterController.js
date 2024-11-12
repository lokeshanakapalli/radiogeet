import SpeedMeter from '../models/smeterModel.js'; // Adjust the import path as necessary

// Create a new SpeedMeter widget
export const createSpeedMeterWidget = async (req, res) => {
  const { dashboardId, speedMeter, topic, min, max } = req.body;

  // Validate input
  if (min && max && min >= max) {
    return res.status(400).json({ message: "Min value must be less than Max value." });
  }

  try {
    const newSpeedMeterWidget = new SpeedMeter({
      dashboardId,
      widgetType: "speedmeter",
      speedMeter,
      topic,
      min, // Optional field
      max, // Optional field
    });

    await newSpeedMeterWidget.save();
    res.status(201).json({
      message: "SpeedMeter widget created successfully",
      data: newSpeedMeterWidget,
    });
  } catch (error) {
    console.error("Error creating SpeedMeter widget:", error);
    res.status(500).json({ message: "Error creating SpeedMeter widget", error: error.message });
  }
};

// Retrieve all SpeedMeter widgets
export const getSpeedMeterWidgets = async (req, res) => {
  try {
    // Retrieve all SpeedMeter widgets
    const speedMeterWidgets = await SpeedMeter.find().exec();

    // Respond with all SpeedMeter widget data
    res.status(200).json({
      message: "All SpeedMeter widgets retrieved successfully",
      data: speedMeterWidgets.length > 0 ? speedMeterWidgets : [], // Return an empty array if no widgets found
      count: speedMeterWidgets.length, // Include a count of the widgets found
    });
  } catch (error) {
    console.error("Error retrieving SpeedMeter widgets:", error);
    res.status(500).json({ message: "Error retrieving SpeedMeter widgets", error: error.message });
  }
};

// Update a SpeedMeter widget
export const updateSpeedMeterWidget = async (req, res) => {
  const { id } = req.params; // SpeedMeter widget ID from the request parameters
  const { speedMeter, topic, min, max } = req.body; // Include new fields

  // Validate input
  if (min && max && min >= max) {
    return res.status(400).json({ message: "Min value must be less than Max value." });
  }

  try {
    const updatedSpeedMeterWidget = await SpeedMeter.findByIdAndUpdate(
      id,
      { speedMeter, topic, min, max }, // Update with new fields
      { new: true } // Return the updated document
    );

    if (!updatedSpeedMeterWidget) {
      return res.status(404).json({ message: "SpeedMeter widget not found." });
    }

    res.status(200).json({
      message: "SpeedMeter widget updated successfully",
      data: updatedSpeedMeterWidget,
    });
  } catch (error) {
    console.error("Error updating SpeedMeter widget:", error);
    res.status(500).json({ message: "Error updating SpeedMeter widget", error: error.message });
  }
};

// Delete a SpeedMeter widget
export const deleteSpeedMeterWidget = async (req, res) => {
  const { id } = req.params; // SpeedMeter widget ID from the request parameters

  try {
    const deletedSpeedMeterWidget = await SpeedMeter.findByIdAndDelete(id);

    if (!deletedSpeedMeterWidget) {
      return res.status(404).json({ message: "SpeedMeter widget not found." });
    }

    res.status(200).json({
      message: "SpeedMeter widget deleted successfully",
      data: deletedSpeedMeterWidget,
    });
  } catch (error) {
    console.error("Error deleting SpeedMeter widget:", error);
    res.status(500).json({ message: "Error deleting SpeedMeter widget", error: error.message });
  }
};
