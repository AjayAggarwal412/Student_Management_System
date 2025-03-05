const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/students", studentRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.REACT_APP_API_URL || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
