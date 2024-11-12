// controllers/quickLinkController.js
import QuickLink from "../models/QuickLink.js";

// Get all quick links
export const getQuickLinks = async (req, res) => {
  try {
    const links = await QuickLink.find();
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new quick link
export const addQuickLink = async (req, res) => {
  const { name, path } = req.body;

  const newLink = new QuickLink({
    name,
    path,
  });

  try {
    const savedLink = await newLink.save();
    res.status(201).json(savedLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a quick link
export const updateQuickLink = async (req, res) => {
  const { id } = req.params;
  const { name, path } = req.body;

  try {
    const updatedLink = await QuickLink.findByIdAndUpdate(
      id,
      { name, path },
      { new: true }
    );
    if (!updatedLink)
      return res.status(404).json({ message: "Link not found" });
    res.json(updatedLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a quick link
export const deleteQuickLink = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLink = await QuickLink.findByIdAndDelete(id);
    if (!deletedLink)
      return res.status(404).json({ message: "Link not found" });
    res.json({ message: "Link deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
