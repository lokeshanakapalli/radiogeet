// controllers/adminController.js
import Admin from '../models/adminModel.js';
import bcrypt from 'bcryptjs';

// Existing registerAdmin function
export const registerAdmin = async (req, res) => {
  const { username, email, password, mobileNumber, countryCode } = req.body;

  try {
    // Check if the email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      mobileNumber,
      countryCode,
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin', error });
  }
};

// New loginAdmin function
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Optionally, you can send back some kind of token or admin details
    res.status(200).json({ message: 'Login successful!', admin: { username: admin.username, email: admin.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    // Fetch all admins from the database
    const admins = await Admin.find();

    // Return the list of admins (excluding sensitive information)
    res.status(200).json({
      admins: admins.map(admin => ({
        id: admin._id,
        username: admin.username,
        email: admin.email,
        mobileNumber: admin.mobileNumber,
        countryCode: admin.countryCode,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error });
  }
};

export const getAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the admin by ID
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Return the admin details (excluding sensitive information like password)
    res.status(200).json({ admin: { id: admin._id, username: admin.username, email: admin.email, mobileNumber: admin.mobileNumber, countryCode: admin.countryCode } });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin details', error });
  }
};
