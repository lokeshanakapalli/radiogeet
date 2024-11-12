import Company from "../models/companyModel.js";
import bcrypt from "bcryptjs";

// Create a new customer
export const createCompany = async (req, res) => {
  try {
    const {
      company,
      description,
      department,
      country,
      countryCode,
      city,
      stateProvince,
      zipPostalCode,
      address,
      address2,
      phone,
      email,
      password,
    } = req.body;

    // Check for unique company name and email
    const existingCompany = await Company.findOne({
      $or: [{ company }, { email }],
    });
    if (existingCompany) {
      return res
        .status(400)
        .json({ error: "Company name or email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new Company({
      company,
      description,
      department,
      country,
      countryCode,
      city,
      stateProvince,
      zipPostalCode,
      address,
      address2,
      phone,
      email,
      password: hashedPassword,
    });

    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the company by email
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, company.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Return the company data without the password
    const { password: hashedPassword, ...companyData } = company._doc;

    res.status(200).json(companyData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all customers
export const getCompany = async (req, res) => {
  try {
    const company = await Company.find();
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a customer by ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a customer by ID
export const updateCompany = async (req, res) => {
  try {
    const { company, email } = req.body;

    // Check for existing customer with same company name or email, excluding the current customer
    const existingCompany = await Company.findOne({
      $or: [{ company }, { email }],
      _id: { $ne: req.params.id }, // Exclude the current customer being updated
    });

    if (existingCompany) {
      return res
        .status(400)
        .json({ error: "Company name or email already exists." });
    }

    const updatedData = { ...req.body };

    // If the password is being updated, hash it
    if (req.body.password) {
      updatedData.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedCompany)
      return res.status(404).json({ error: "Company not found" });

    res.status(200).json(updatedCompany);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a customer by ID
export const deleteCompany = async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany)
      return res.status(404).json({ error: "Company not found" });

    res.status(200).json({ message: "Company deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
