// models/QuickLink.js
import mongoose from "mongoose";

const quickLinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
});

const QuickLink = mongoose.model("QuickLink", quickLinkSchema);

export default QuickLink;
