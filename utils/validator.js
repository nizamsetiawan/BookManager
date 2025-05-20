const { body, param } = require("express-validator");

// Validation for registration
const validateRegister = [
  body("username")
    .notEmpty()
    .withMessage("Username tidak boleh kosong")
    .isLength({ min: 3, max: 50 })
    .withMessage("Username harus memiliki panjang 3-50 karakter")
    .trim(),
  body("password")
    .notEmpty()
    .withMessage("Password tidak boleh kosong")
    .isLength({ min: 6 })
    .withMessage("Password minimal harus 6 karakter"),
];

// Validation for login
const validateLogin = [
  body("username").notEmpty().withMessage("Username tidak boleh kosong").trim(),
  body("password").notEmpty().withMessage("Password tidak boleh kosong"),
];

// Validation for book creation and update
const validateBook = [
  body("title")
    .notEmpty()
    .withMessage("Judul buku tidak boleh kosong")
    .isLength({ max: 255 })
    .withMessage("Judul buku maksimal 255 karakter")
    .trim(),
  body("author")
    .notEmpty()
    .withMessage("Nama penulis tidak boleh kosong")
    .isLength({ max: 255 })
    .withMessage("Nama penulis maksimal 255 karakter")
    .trim(),
  body("year")
    .notEmpty()
    .withMessage("Tahun terbit tidak boleh kosong")
    .isInt({ min: 1, max: new Date().getFullYear() })
    .withMessage(
      `Tahun terbit harus berupa angka antara 1 dan ${new Date().getFullYear()}`
    ),
];

// Validation for book ID
const validateBookId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("ID buku harus berupa angka positif"),
];

module.exports = {
  validateRegister,
  validateLogin,
  validateBook,
  validateBookId,
};
