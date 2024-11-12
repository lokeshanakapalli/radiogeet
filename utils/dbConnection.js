import mongoose from "mongoose";

// Replace with your MongoDB connection string
const uri = "mongodb+srv://heeltech:heeltech@cluster0.sb6po.mongodb.net/MQTT";

// Arrow function to connect to the database and perform operations
const insertSampleDocument = async () => {
  let connection = null;
  try {
    // Connect to MongoDB using Mongoose
    connection = await mongoose.connect(uri);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  } 
};

// Export the function for use in other files
export default insertSampleDocument;