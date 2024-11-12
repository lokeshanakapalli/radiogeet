import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    company: { type: String, required: true, unique: true }, // Ensure company name is unique
    description: { type: String, required: true },
    department: { type: String, required: true }, // Added department
    country: { type: String, required: true },
    countryCode: { type: String, required: true }, // Added countryCode
    city: { type: String, required: true },
    stateProvince: { type: String, required: true },
    zipPostalCode: { type: String, required: true },
    address: { type: String, required: true },
    address2: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure email is unique
    password: { type: String, required: true }, // Added password
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
export default Company;
