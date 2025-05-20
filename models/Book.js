const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Judul buku tidak boleh kosong",
        },
        len: {
          args: [1, 255],
          msg: "Judul buku harus memiliki panjang antara 1 dan 255 karakter",
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Nama penulis tidak boleh kosong",
        },
        len: {
          args: [1, 255],
          msg: "Nama penulis harus memiliki panjang antara 1 dan 255 karakter",
        },
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Tahun harus berupa angka",
        },
        min: {
          args: [1],
          msg: "Tahun harus lebih besar dari 0",
        },
        max: {
          args: [new Date().getFullYear()],
          msg: "Tahun tidak boleh lebih besar dari tahun saat ini",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Book;
