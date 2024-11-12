import mongoose from "mongoose";

const assetProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    defaultRuleChain: { type: String },
    mobileDashboard: { type: String },
    queue: { type: String },
    defaultEdgeRuleChain: { type: String },
    file: { type: String }, // You may need to handle file uploads separately
    description: { type: String },
  },
  { timestamps: true }
);

const AssetProfile = mongoose.model("AssetProfile", assetProfileSchema);

export default AssetProfile;
