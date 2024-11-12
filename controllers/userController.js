// controllers/userController.js
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

// Controller function to create a new user
export const createUser = async (req, res) => {
  const { firstName, lastName, email, countryCode, mobileNumber, password } =
    req.body;

  try {
    // Hash the password before saving
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      countryCode,
      mobileNumber,
      password: hashedPassword, // Store the hashed password
      createdTime: new Date(), // Ensure createdTime is set to now
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function to get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    // Send error response
    res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
};

// Controller function to get a user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findById(id).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    // Send error response
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: err.message,
    });
  }
};

// Controller function to update a user by ID
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, countryCode, mobileNumber, password } =
      req.body;

    // Check if another user already exists with the same email or mobile number
    const existingUser = await User.findOne({
      $or: [{ email }],
      _id: { $ne: id }, // Exclude the current user by ID
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Another user already exists with the same email",
      });
    }

    const updateData = {
      firstName,
      lastName,
      email,
      countryCode,
      mobileNumber,
    };

    // If password is provided, hash it and update
    if (password) {
      updateData.password = await bcryptjs.hash(password, 10);
    }

    // Find and update the user by ID
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    // Send error response
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: err.message,
    });
  }
};

// Controller function to delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    // Send error response
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: err.message,
    });
  }
};
