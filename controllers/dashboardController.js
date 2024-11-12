import Dashboard from "../models/dashboardModel.js";

export const createDashboard = async (req, res) => {
  const { title, description, companyId, companyName, groups } = req.body;
  const image = req.file ? req.file.path : null;

  // Validate all required fields
  if (!title || !description || !companyId || !companyName || !groups || !image) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Create a new dashboard
    const newDashboard = new Dashboard({
      title,
      description,
      companyId, // Store companyId
      companyName,
      groups,
      image,
    });

    // Save the dashboard in the database
    const dashboard = await newDashboard.save();
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all dashboards
export const getAllDashboards = async (req, res) => {
  try {
    // Fetch all dashboards with the related company details
    const dashboards = await Dashboard.find().populate('companyId', 'companyName'); 
    res.json(dashboards);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Additional controller functions can follow a similar pattern
