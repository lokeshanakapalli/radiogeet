import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Company", // Assuming you have a Company model for reference
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  groups: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true, // Store image URL or path
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
});

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

export default Dashboard;
