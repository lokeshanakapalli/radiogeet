// routes/asset.routes.js
import { Router } from "express";
import {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
} from "../controllers/entityAssetsController.js";

const router = Router();

// Define routes
router.post("/", createAsset);
router.get("/", getAssets);
router.get("/:id", getAssetById);
router.put("/:id", updateAsset);
router.delete("/:id", deleteAsset);

export default router;
