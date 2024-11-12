import express from "express";
import {
  createAssetProfile,
  getAssetProfiles,
  getAssetProfileById,
  updateAssetProfile,
  deleteAssetProfile,
  uploadFile,
} from "../controllers/profileAssetsController.js";

const router = express.Router();

// Route to create a new asset profile with file upload
router.post("/", uploadFile, createAssetProfile);

// Other routes
router.get("/", getAssetProfiles);
router.get("/:id", getAssetProfileById);
router.put("/:id", updateAssetProfile);
router.delete("/:id", deleteAssetProfile);

export default router;
