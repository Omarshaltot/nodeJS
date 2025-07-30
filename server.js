// server.js

const express = require("express");
require("dotenv").config();

const app = express();

// Connect to DB
const dbConnection = require("./config/database");
dbConnection();

// Middleware
app.use(express.json());

// Routes
const UserRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoute = require("./routes/authenRoutes");

app.use("/api/user", UserRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});