const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const Book = require("../models/Book");

// Create a new book
const createBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array().map((err) => err.msg),
      });
    }

    const { title, author, year } = req.body;

    const book = await Book.create({
      title,
      author,
      year,
    });

    res.status(201).json({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: book,
    });
  } catch (error) {
    console.error("Create book error:", error);

    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        status: "error",
        message: "Validasi gagal",
        errors: validationErrors,
      });
    }

    res.status(500).json({
      status: "error",
      message: "Server error saat menambahkan buku",
    });
  }
};

// Get all books with filters by query params (title, author, year) or all books
const getAllBooks = async (req, res) => {
  try {
    const { title, author, year } = req.query;

    const filter = {};

    if (title) {
      filter.title = { [Op.like]: `%${title}%` };
    }

    if (author) {
      filter.author = { [Op.like]: `%${author}%` };
    }

    if (year) {
      filter.year = year;
    }

    const books = await Book.findAll({
      where: filter,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      status: "success",
      message: "Daftar buku berhasil diambil",
      data: books,
    });
  } catch (error) {
    console.error("Get books error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error saat mengambil daftar buku",
    });
  }
};

// Get book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "Buku tidak ditemukan",
      });
    }

    res.json({
      status: "success",
      message: "Detail buku berhasil diambil",
      data: book,
    });
  } catch (error) {
    console.error("Get book by ID error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error saat mengambil detail buku",
    });
  }
};

// Update book
const updateBook = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array().map((err) => err.msg),
      });
    }

    const { id } = req.params;
    const { title, author, year } = req.body;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "Buku tidak ditemukan",
      });
    }

    await book.update({
      title,
      author,
      year,
    });

    res.json({
      status: "success",
      message: "Buku berhasil diperbarui",
      data: book,
    });
  } catch (error) {
    console.error("Update book error:", error);

    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        status: "error",
        message: "Validasi gagal",
        errors: validationErrors,
      });
    }

    res.status(500).json({
      status: "error",
      message: "Server error saat memperbarui buku",
    });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        status: "error",
        message: "Buku tidak ditemukan",
      });
    }

    await book.destroy();

    res.json({
      status: "success",
      message: "Buku berhasil dihapus",
    });
  } catch (error) {
    console.error("Delete book error:", error);
    res.status(500).json({
      status: "error",
      message: "Server error saat menghapus buku",
    });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
