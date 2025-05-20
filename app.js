const express = require("express");
const cors = require("cors");
const { sequelize, testConnection } = require("./config/dbConfig");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const loggerMiddleware = require("./middleware/loggerMiddleware");
const User = require("./models/User"); // Import untuk memastikan model dibuat
const Book = require("./models/Book"); // Import untuk memastikan model dibuat
require("dotenv").config();

// Init
const app = express();
const PORT = process.env.PORT || 3306;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// Test database connection
testConnection();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Error handling
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "Route tidak ditemukan",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server",
  });
});

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced successfully");

    app.listen(PORT, () => {
      console.log(`Server berjalan pada port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to sync database or start server:", error);
  }
})();
