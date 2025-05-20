# Book Manager API


Backend sederhana untuk mengelola data buku.

## Fitur Utama

- [POST] `/books` – Tambah buku baru  
- [GET] `/books` – Ambil semua buku (dapat menggunakan query filter)  
- [GET] `/books/:id` – Ambil detail buku berdasarkan ID  
- [PUT] `/books/:id` – Perbarui data buku 
- [DELETE] `/books/:id` – Hapus buku  
- 🔐 Autentikasi JWT (Login & Register)

## Arsitektur Aplikasi

```
project-root/
├── app.js
├── config/
│ └── dbConfig.js
├── controllers/
│ ├── authControllers.js
│ └── bookControllers.js
├── middleware/
│ ├── authMiddleware.js
│ └── loggerMiddleware.js
├── models/
│ ├── Book.js
│ └── User.js
├── routes/
│ ├── authRoutes.js
│ └── bookRoutes.js
├── utils/
│ └── validator.js
```

## Teknologi yang Digunakan

- Node.js + Express  
- MySql (db)
- JWT (untuk autentikasi)  
- Express Validator  
- Logger
- Postman

## Cara Menjalankan

### Prasyarat

- Node Js (Versi 18 +)

### Langkah-langkah

1. Clone repositori:
   ```bash
   git clone https://github.com/nizamstwn/arestro.git 
   cd book-manager-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Buat File .env:
   ```bash
   PORT=your_port || JWT_SECRET=your_jwt_secret  || DB_NAME=your_database_name  || DB_USER=your_database_user  || DB_PASSWORD=your_database_password  || DB_HOST=localhost
   
   ```

4. Jalankan aplikasi:
   ```bash
   npm run start
   ```




## Documentation Postman

[Documentation](https://www.postman.com/gold-meadow-442302/workspace/my-workspace/collection/45130423-f17afb89-0619-4a6f-8c6b-b2e9266b42b5?action=share&creator=45130423)

