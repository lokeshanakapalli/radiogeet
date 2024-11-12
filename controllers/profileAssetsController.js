import multer from "multer";
import AssetProfile from "../models/profileAssetsModel.js";
import path from "path";
import fs from "fs";

// Handle ES module `__dirname` equivalent
const __dirname = path.resolve();

// Ensure the 'uploads' directory exists
const uploadDirectory = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Directory to store the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Middleware to handle file upload
export const uploadFile = upload.single("file");

// Create a new asset profile
export const createAssetProfile = async (req, res) => {
  try {
    const {
      name,
      defaultRuleChain,
      mobileDashboard,
      queue,
      defaultEdgeRuleChain,
      description,
    } = req.body;

    const file = req.file;

    const newAssetProfile = new AssetProfile({
      name,
      defaultRuleChain,
      mobileDashboard,
      queue,
      defaultEdgeRuleChain,
      description,
      filePath: file ? file.path : null, // Save the file path in the database
    });

    await newAssetProfile.save();
    res.status(201).json(newAssetProfile);
  } catch (error) {
    console.error("Error creating asset profile:", error.message);
    res.status(500).json({ message: "Error creating asset profile" });
  }
};

// Get all asset profiles
export const getAssetProfiles = async (req, res) => {
  try {
    const assetProfiles = await AssetProfile.find();
    res.status(200).json(assetProfiles);
  } catch (error) {
    console.error("Error fetching asset profiles:", error.message);
    res.status(500).json({ message: "Error fetching asset profiles" });
  }
};

// Get a single asset profile by ID
export const getAssetProfileById = async (req, res) => {
  try {
    const assetProfile = await AssetProfile.findById(req.params.id);
    if (!assetProfile)
      return res.status(404).json({ message: "AssetProfile not found" });
    res.status(200).json(assetProfile);
  } catch (error) {
    console.error("Error fetching asset profile:", error.message);
    res.status(500).json({ message: "Error fetching asset profile" });
  }
};

// Update an asset profile by ID
export const updateAssetProfile = async (req, res) => {
  try {
    const updatedAssetProfile = await AssetProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAssetProfile)
      return res.status(404).json({ message: "AssetProfile not found" });
    res.status(200).json(updatedAssetProfile);
  } catch (error) {
    console.error("Error updating asset profile:", error.message);
    res.status(500).json({ message: "Error updating asset profile" });
  }
};

// Delete an asset profile by ID
export const deleteAssetProfile = async (req, res) => {
  try {
    const deletedAssetProfile = await AssetProfile.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAssetProfile)
      return res.status(404).json({ message: "AssetProfile not found" });
    res.status(200).json({ message: "AssetProfile deleted" });
  } catch (error) {
    console.error("Error deleting asset profile:", error.message);
    res.status(500).json({ message: "Error deleting asset profile" });
  }
};
