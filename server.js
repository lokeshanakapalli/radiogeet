import express from "express";
import mqtt from "mqtt";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";

import userRoutes from "./routes/userRoute.js";
import dashboardRoutes from "./routes/dashboardRoute.js";
import deviceRoutes from "./routes/deviceRoute.js";
import companyRoutes from "./routes/companyRoute.js";
import assetRoutes from "./routes/entityAssetsRoute.js";
import assetProfileRoutes from "./routes/profileAssetsRoute.js";
import insertSampleDocument from "./utils/dbConnection.js";
import mqttRoutes from "./routes/mqttDataRoute.js";
import batteryRoute from './routes/batteryRoute.js'
import sMeter from './routes/sMeterRoute.js'
import sMeter2 from './routes/sMeterRoute2.js'
import barChart from './routes/barchartRoute.js'
import pieCharts from './routes/piechartRoute.js'
import mqttDataRoute2 from './routes/mqttDataRoute2.js'
import lineChart from './routes/linechartRoute.js'
import areaChart from './routes/areachartRoute.js'
import progressionRoute from './routes/progressionRoute.js'

import alertRoute from './routes/alertRoute.js'

import quickLinkRoutes from "./routes/quickLinkRoutes.js";

import adminRoute from './routes/adminRoute.js'

import Device from "./models/deviceModel.js";
import { saveMqttData } from "./controllers/mqttDataController.js";

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Handle ES module __dirname equivalent
const __dirname = path.resolve();

// Ensure the 'uploads' directory exists
const uploadDirectory = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// Middleware setup
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://iiot.radiogeet.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(uploadDirectory));

// Use the routes
app.use("/api/users", userRoutes);
app.use("/api/dashboards", dashboardRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/profile-assets", assetProfileRoutes);
app.use("/api/quick-links", quickLinkRoutes);
app.use("/api/mqtt", mqttRoutes); // Add the MQTT route for retrieving stored data
app.use("/api/batteries",batteryRoute);
app.use('/api/speedmeters',sMeter)
app.use('/api/speedmeters2',sMeter2)
app.use('/api/barcharts',barChart)
app.use('/api/piecharts',pieCharts)
app.use('/api/mqtt2',mqttDataRoute2)
app.use('/api/linecharts',lineChart)
app.use('/api/areacharts',areaChart)
app.use('/api/progression',progressionRoute)

app.use('/api/alerts',alertRoute)

app.use('/api/admin',adminRoute)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Something went wrong!", details: err.message });
});

// Create an HTTP server and attach socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://iiot.radiogeet.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

// MongoDB connection
insertSampleDocument(); // Make sure this is correctly implemented

// MQTT broker details
const mqtt_broker = "mqtt://65.108.59.42";
const mqtt_user = "admin";
const mqtt_password = "loke5552";
let mqttClient;

// Function to start the MQTT client
const startMqttClient = () => {
  mqttClient = mqtt.connect(mqtt_broker, {
    username: mqtt_user,
    password: mqtt_password,
  });

  mqttClient.on("connect", () => {
    console.log("Connected to MQTT broker");
    subscribeToDeviceTopics(); // Initial subscription
  });

  mqttClient.on("error", (error) => {
    console.error("MQTT Connection Error:", error);
  });

  mqttClient.on("message", (topic, message) => {
    console.log(`Message received on topic '${topic}': ${message.toString()}`);
    saveMqttData(topic, message.toString());
    io.emit("mqttMessage", { topic, message: message.toString() });
  });
};

// Subscribe to existing device topics
const subscribeToDeviceTopics = async () => {
  try {
    const devices = await Device.find({}, "topic");
    const topics = devices.map((device) => device.topic);
    mqttClient.subscribe(topics, (err) => {
      if (!err) {
        console.log(`Subscribed to topics: ${topics.join(", ")}`);
      } else {
        console.error("Error subscribing to topics:", err);
      }
    });
  } catch (err) {
    console.error("Error fetching devices:", err);
  }
};

// Unsubscribe from topics of deleted devices
const unsubscribeFromDeviceTopics = (deletedTopics) => {
  deletedTopics.forEach((topic) => {
    mqttClient.unsubscribe(topic, (err) => {
      if (!err) {
        console.log(`Unsubscribed from topic: ${topic}`);
      } else {
        console.error("Error unsubscribing from topic:", err);
      }
    });
  });
};

// Polling function to check for new devices and handle deletions
const checkForNewDevices = async () => {
  try {
    const devices = await Device.find({});
    const currentTopics = devices.map((device) => device.topic);

    // Store previous topics in memory
    if (!checkForNewDevices.previousTopics) {
      checkForNewDevices.previousTopics = [];
    }

    // Check for new topics
    const newTopics = currentTopics.filter(
      (topic) => !checkForNewDevices.previousTopics.includes(topic)
    );

    // Check for deleted topics
    const deletedTopics = checkForNewDevices.previousTopics.filter(
      (topic) => !currentTopics.includes(topic)
    );

    if (newTopics.length > 0) {
      newTopics.forEach((topic) => {
        mqttClient.subscribe(topic, (err) => {
          if (!err) {
            console.log(`Subscribed to new topic: ${topic}`);
          } else {
            console.error("Error subscribing to new topic:", err);
          }
        });
      });
    }

    if (deletedTopics.length > 0) {
      unsubscribeFromDeviceTopics(deletedTopics);
    }

    // Update previous topics
    checkForNewDevices.previousTopics = currentTopics;
  } catch (err) {
    console.error("Error fetching devices:", err);
  }
};

// Set an interval to check for new devices every 5 seconds
setInterval(checkForNewDevices, 5000); // Adjust the interval as needed

// Handle new WebSocket connections
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Start the MQTT client
startMqttClient();

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
