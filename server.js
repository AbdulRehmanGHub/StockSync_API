require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const itemRoutes = require("./routes/items");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use("/api/items", itemRoutes);
app.use(express.static("public"));

module.exports = app;

if (process.env.NODE_ENV !== "test") {
  const mongoose = require("mongoose");
  mongoose
    .connect(process.env.MONGODB_URI, {})
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Connection error:", err));

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
