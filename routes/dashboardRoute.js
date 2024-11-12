// routes/dashboardRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import {
  createDashboard,
  getAllDashboards,
  // getDashboardById,
  // updateDashboard,
  // deleteDashboard,
} from "../controllers/dashboardController.js";

const router = express.Router();

// Set up storage for image files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|svg/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: File type not supported");
  },
});

// Define routes
router.post("/", upload.single("image"), createDashboard);
router.get("/", getAllDashboards);
// router.get("/:id", getDashboardById);
// router.put("/:id", updateDashboard);
// router.delete("/:id", deleteDashboard);

export default router;
