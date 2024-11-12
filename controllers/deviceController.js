import bcrypt from "bcryptjs";
import Device from "../models/deviceModel.js"; // Adjust the path as necessary

// Create a new device with password hashing
export const createDevice = async (req, res) => {
  const {
    name,
    label,
    company,
    ownerEmail,
    groups,
    topic,
    username,
    password,
    companyId,
  } = req.body;

  try {
    // Check if the required fields are provided
    if (!name || !label || !company || !ownerEmail || !topic || !username || !password || !companyId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the topic is already registered
    const existingDevice = await Device.findOne({ topic });
    if (existingDevice) {
      return res.status(400).json({ message: "Topic already registered." });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the generated salt

    // Create new device with the hashed password
    const newDevice = new Device({
      name,
      label,
      company,
      ownerEmail,
      groups,
      topic,
      username,
      password: hashedPassword, // Store the hashed password
      companyId,
    });

    // Save the device to the database
    const savedDevice = await newDevice.save();
    res.status(201).json(savedDevice); // Respond with the saved device
  } catch (error) {
    console.error("Error creating device:", error);
    res.status(500).json({ message: "Failed to create device." });
  }
};

// Function to get all devices
export const getDevices = async (req, res) => {
  try {
    // Retrieve all devices from the database, optionally populate companyId if needed
    const devices = await Device.find().populate('companyId', 'name'); // Populate companyId with name field

    res.status(200).json(devices); // Respond with the retrieved devices
  } catch (error) {
    console.error("Error retrieving devices:", error);
    res.status(500).json({ message: "Failed to retrieve devices." });
  }
};


export const checkTopicUnique = async (req, res) => {
  const { topic } = req.query;
  try {
    const device = await Device.findOne({ topic });
    res.json({ isUnique: !device });
  } catch (error) {
    res.status(500).json({ message: "Error checking topic uniqueness." });
  }
};

// Function to update a device
// Function to update a device
export const updateDevice = async (req, res) => {
  const { id } = req.params; // Extracting the ID from the request parameters
  const {
    name,
    label,
    company,
    ownerEmail,
    groups,
    username,
    password,
    companyId,
  } = req.body;

  try {
    // Check if the device exists using the ID
    const existingDevice = await Device.findById(id);
    if (!existingDevice) {
      return res.status(404).json({ message: "Device not found." });
    }

    // Update device details
    existingDevice.name = name || existingDevice.name;
    existingDevice.label = label || existingDevice.label;
    existingDevice.company = company || existingDevice.company;
    existingDevice.ownerEmail = ownerEmail || existingDevice.ownerEmail;
    existingDevice.groups = groups || existingDevice.groups;
    existingDevice.username = username || existingDevice.username;
    existingDevice.companyId = companyId || existingDevice.companyId;

    // Hash the password only if it's provided
    if (password) {
      const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
      existingDevice.password = await bcrypt.hash(password, salt); // Hash the new password
    }

    // Save the updated device to the database
    const updatedDevice = await existingDevice.save();
    res.status(200).json(updatedDevice); // Respond with the updated device
  } catch (error) {
    console.error("Error updating device:", error);
    res.status(500).json({ message: "Failed to update device." });
  }
};
;

// Function to delete a device
export const deleteDevice = async (req, res) => {
  const { topic } = req.params; // Assuming you are using the topic as a parameter

  try {
    // Check if the device exists
    const existingDevice = await Device.findOne({ topic });
    if (!existingDevice) {
      return res.status(404).json({ message: "Device not found." });
    }

    // Delete the device from the database
    await Device.deleteOne({ topic });
    res.status(204).json({ message: "Device deleted successfully." }); // Respond with no content
  } catch (error) {
    console.error("Error deleting device:", error);
    res.status(500).json({ message: "Failed to delete device." });
  }
};
