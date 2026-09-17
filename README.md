# AKTIVA Backend API

Backend REST API untuk aplikasi mobile blog **AKTIVA**. API ini menyediakan layanan data dan autentikasi untuk kebutuhan konten blog, termasuk manajemen pengguna, artikel, kategori, bookmark, dan komentar.

## About

AKTIVA adalah aplikasi blog mobile. Backend ini bertugas menyediakan REST API sebagai penghubung antara client mobile dengan database, menangani logika bisnis seperti autentikasi, pengelolaan konten, dan penyimpanan gambar melalui Cloudinary.

## Features

- **Authentication** — Registrasi, login, dan manajemen profil dengan JWT
- **Post Management** — CRUD artikel dengan status draft/published, cover image upload, dan validasi input
- **Category Management** — Pengelolaan kategori artikel
- **Bookmark** — Pengguna dapat menyimpan dan menghapus bookmark pada artikel
- **Comment** — Sistem komentar pada artikel
- **Image Upload** — Upload cover image ke Cloudinary dengan validasi tipe dan ukuran file

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Language** — TypeScript
- **Database** — MySQL
- **ORM** — Drizzle ORM
- **Authentication** — JSON Web Token (JWT)
- **Password Hashing** — bcrypt
- **Image Storage** — Cloudinary
- **File Upload** — Multer (memory storage)
- **Validation** — Zod
- **HTTP Logger** — Morgan
- **CORS** — cors

## Project Structure

```text
src/
├── config/
│   ├── db.ts              # Koneksi database MySQL + Drizzle
│   ├── schema.ts          # Definisi tabel database (Drizzle schema)
│   └── cloudinary.ts      # Konfigurasi Cloudinary
├── controllers/
│   ├── auth.controller.ts
│   ├── posts.controller.ts
│   ├── categories.controller.ts
│   ├── bookmarks.controller.ts
│   └── comment.controller.ts
├── middleware/
│   ├── auth.middleware.ts  # Verifikasi JWT token
│   └── upload.middleware.ts# Middleware upload file via Multer
├── routes/
│   ├── auth.routes.ts
│   ├── posts.routes.ts
│   ├── categories.route.ts
│   ├── bookmarks.routes.ts
│   └── comment.route.ts
├── services/
│   ├── auth.service.ts
│   ├── posts.service.ts
│   ├── categories.service.ts
│   ├── bookmarks.service.ts
│   ├── comment.service.ts
│   └── cloudinary.service.ts
├── types/
│   ├── auth.type.ts
│   └── posts.type.ts
├── utils/
│   └── jwt.ts             # Fungsi generate & verify token JWT
├── validations/
│   └── post.validation.ts # Zod schema validasi untuk post
└── index.ts               # Entry point server Express
```

## API Architecture

```text
Mobile Client
      ↓
  REST API (Express)
      ↓
   Routes
      ↓
   Controllers
      ↓
   Services
      ↓
   Database (MySQL + Drizzle ORM)
```

Setiap request melewati route → controller → service → database. Middleware autentikasi diterapkan pada route yang memerlukan akses terproteksi.

## Authentication

Sistem autentikasi menggunakan **JWT (JSON Web Token)**:

```text
Registrasi → Password di-hash dengan bcrypt → Data disimpan di database
                                                         ↓
Login → Validasi email & password → Token JWT dibuat (expiry: 7 hari)
                                                         ↓
Client menyimpan token → Kirim via header: Authorization: Bearer <token>
                                                         ↓
Middleware memverifikasi token → Request dilanjutkan jika valid
```

Password tidak disimpan dalam bentuk plaintext — semua password di-hash menggunakan bcrypt sebelum disimpan.

## API Endpoints

### Root

| Method | Endpoint | Description | Auth |
| ------ | -------- | ----------- | ---- |
| GET | `/` | Health check / status server | No |

### Auth — `/api/auth`

| Method | Endpoint | Description | Auth |
| ------ | -------- | ----------- | ---- |
| POST | `/api/auth/register` | Registrasi pengbaru | No |
| POST | `/api/auth/login` | Login, mengembalikan JWT token | No |
| GET | `/api/auth/profile` | Mendapatkan data profil pengguna | Yes |
| PATCH | `/api/auth/profile` | Memperbarui profil (name, email, phoneNumber) | Yes |
| DELETE | `/api/auth/profile` | Menghapus akun pengguna | Yes |

### Posts — `/api/posts`

Semua endpoint memerlukan autentikasi.

| Method | Endpoint | Description | Auth |
| ------ | -------- | ----------- | ---- |
| GET | `/api/posts` | Mendapatkan semua post (join user & kategori) | Yes |
| GET | `/api/posts/:id` | Mendapatkan post berdasarkan ID | Yes |
| POST | `/api/posts` | Membuat post baru (supports coverImage upload) | Yes |
| PATCH | `/api/posts/:id` | Memperbarui post (hanya pemilik, supports coverImage upload) | Yes |
| DELETE | `/api/posts/:id` | Menghapus post (hanya pemilik) | Yes |
| DELETE | `/api/posts/{DELETE_ALL_SECRET}` | Menghapus semua post (protected by secret) | Yes |

### Categories — `/api/categories`

| Method | Endpoint | Description | Auth |
| ------ | -------- | ----------- | ---- |
| GET | `/api/categories` | Mendapatkan semua kategori | Yes |

### Bookmarks — `/api/bookmarks`

Semua endpoint memerlukan autentikasi.

| Method | Endpoint | Description | Auth |
| ------ | -------- | ----------- | ---- |
| GET | `/api/bookmarks` | Mendapatkan semua bookmark pengguna | Yes |
| GET | `/api/bookmarks/:postId` | Mengecek bookmark berdasarkan post | Yes |
| POST | `/api/bookmarks/:postId` | Menambahkan post ke bookmark | Yes |
| DELETE | `/api/bookmarks/:postId` | Menghapus bookmark | Yes |

### Comments — `/api/comment`

| Method | Endpoint | Description | Auth |
| ------ | -------- | ----------- | ---- |
| GET | `/api/comment/post/:postId` | Mendapatkan komentar berdasarkan post | No |
| POST | `/api/comment/post/:postId` | Menambahkan komentar | Yes |
| DELETE | `/api/comment/:commentId` | Menghapus komentar (hanya pemilik komentar) | Yes |

## Database

Backend menggunakan **MySQL** dengan **Drizzle ORM** sebagai query builder dan schema manager.

### Tabel

| Tabel | Keterangan |
| ----- | ---------- |
| `users` | Data pengguna (name, email, password, phone_number) |
| `categories` | Kategori artikel (slug, category_name, category_description) |
| `posts` | Artikel blog (title, content, summary, cover_image, status, view_count, dll) |
| `comments` | Komentar pada artikel |
| `bookmarks` | Bookmark pengguna pada artikel (unique constraint: user_id + post_id) |

### Relasi

- `posts.user_id` → `users.id` (cascade delete)
- `posts.category_id` → `categories.id` (cascade delete)
- `comments.user_id` → `users.id` (cascade delete)
- `comments.post_id` → `posts.id` (cascade delete)
- `bookmarks.user_id` → `users.id` (cascade delete)
- `bookmarks.post_id` → `posts.id` (cascade delete)

## Image Upload

Upload gambar ditangani oleh **Multer** (memory storage) dan disimpan ke **Cloudinary**.

- **Middleware**: `uploadThumbnail` — menerima satu file dengan field name `coverImage`
- **Ukuran maksimum**: 5 MB
- **Format yang diizinkan**: JPEG, PNG, WebP
- **Penyimpanan**: Cloudinary, folder `posts`
- **Digunakan pada**: Create post dan Update post

## Requirements

- Node.js
- npm
- MySQL
- Akun Cloudinary (untuk penyimpanan gambar)

## Installation

```bash
git clone <repository-url>
cd aktiva-backend-api
npm install
```

## Environment Variables

Buat file `.env` di root project dengan variabel berikut:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_NAME=your_db_name

# JWT
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Delete All Posts Secret
DELETE_ALL_SECRET=your_secret_key
```

## Running the Server

```bash
# Development (menggunakan nodemon untuk auto-reload)
npm run dev

# Build TypeScript
npm run build

# Production
npm start
```

Server berjalan di **http://localhost:3000**

## API Base URL

```text
http://localhost:3000
```

Semua endpoint API menggunakan prefix `/api`, kecuali root endpoint `/` untuk health check.

## Testing API

API dapat diuji menggunakan tools seperti **Postman** atau **cURL**. Tidak ada automated test yang tersedia di repository saat ini.

## Development Status

Backend masih dalam tahap pengembangan. Beberapa fitur kategori (get by ID, create, update, delete) sudah tersedia di service layer namun belum terpasang di route.

## Author

**MetamorphosisDev**
