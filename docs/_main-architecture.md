# Backend Architecture

## Architecture

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

## Responsibility

Route
→ Menentukan endpoint.

Middleware
→ Melakukan pengecekan sebelum controller.

Controller
→ Mengatur request dan response.

Service
→ Menangani business logic.

Database
→ Menyimpan dan mengambil data.