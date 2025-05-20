const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
require("dotenv").config();

// Register User
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array().map((err) => err.msg),
      });
    }

    const { username, password } = req.body;

    // Check if user already
    const userExists = await User.findOne({ where: { username } });
    if (userExists) {
      return res.status(400).json({
        status: "error",
        message: "Username sudah digunakan",
      });
    }

    const user = await User.create({
      username,
      password,
    });

    res.status(201).json({
      status: "success",
      message: "User berhasil didaftarkan",
      data: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error saat mendaftarkan user",
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array().map((err) => err.msg),
      });
    }

    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Username atau password salah",
      });
    }

    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Username atau password salah",
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "1d" }
    );

    res.json({
      status: "success",
      message: "Login berhasil",
      data: {
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error saat login",
    });
  }
};

module.exports = {
  register,
  login,
};
