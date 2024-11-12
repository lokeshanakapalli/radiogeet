// routes/quickLinkRoutes.js
import express from "express";
import {
  getQuickLinks,
  addQuickLink,
  updateQuickLink,
  deleteQuickLink,
} from "../controllers/quickLinkController.js";

const router = express.Router();

router.get("/", getQuickLinks);
router.post("/", addQuickLink);
router.put("/:id", updateQuickLink); // Route for updating a quick link
router.delete("/:id", deleteQuickLink); // Route for deleting a quick link

export default router;
