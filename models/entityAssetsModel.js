// models/asset.model.js
import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  label: { type: String },
  assetProfile: { type: String },
  description: { type: String },
  owner: { type: String }, // If this is an email, you might want to use a more specific validation
  groups: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const EntityAsset = mongoose.model("Asset", assetSchema);

export default EntityAsset;
