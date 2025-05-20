const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookControllers");
const authMiddleware = require("../middleware/authMiddleware");
const { validateBook, validateBookId } = require("../utils/validator");

// Create book
router.post("/", authMiddleware, validateBook, bookController.createBook);

// Get all books
router.get("/", bookController.getAllBooks);

// Get book by ID
router.get("/:id", validateBookId, bookController.getBookById);

// Update book
router.put(
  "/:id",
  authMiddleware,
  validateBookId,
  validateBook,
  bookController.updateBook
);

// Delete book
router.delete(
  "/:id",
  authMiddleware,
  validateBookId,
  bookController.deleteBook
);

module.exports = router;
