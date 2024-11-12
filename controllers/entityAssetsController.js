// controllers/asset.controller.js
import Asset from "../models/entityAssetsModel.js";

// Create a new asset
export const createAsset = async (req, res) => {
  try {
    const newAsset = new Asset(req.body);
    await newAsset.save();
    res.status(201).json(newAsset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all assets
export const getAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single asset by ID
export const getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });
    res.status(200).json(asset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an asset by ID
export const updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!asset) return res.status(404).json({ message: "Asset not found" });
    res.status(200).json(asset);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an asset by ID
export const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });
    res.status(200).json({ message: "Asset deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
