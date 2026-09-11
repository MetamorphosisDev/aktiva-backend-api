# Backend Flow

## General Flow

Alur utama API:

Client
  ↓
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Database
  ↓
Service
  ↓
Controller
  ↓
Client


## Fungsi Tiap Bagian

### Route
Menentukan endpoint dan controller yang dijalankan.

### Middleware
Melakukan pengecekan sebelum request masuk ke controller.
Contohnya authentication menggunakan JWT.

### Controller
Mengatur request dan response HTTP.
Controller memanggil service, bukan melakukan query database secara langsung.

### Service
Berisi business logic dan proses data.

### Database
Tempat data disimpan dan diambil.


## Contoh Flow

DELETE /posts/:id

Client
  ↓
Route
  ↓
Auth Middleware
  ↓
deletePostController()
  ↓
deletePost()
  ↓
Database
  ↓
Response