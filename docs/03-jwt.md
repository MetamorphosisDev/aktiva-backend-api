# JWT

## JWT Token

Token yang diberikan kepada client setelah login berhasil.

Digunakan pada request:

Authorization: Bearer <token>

## JWT Secret

Secret yang hanya diketahui server.

Digunakan untuk:

- membuat JWT
- memverifikasi JWT

Contoh:

JWT_SECRET=your-secret

## Flow

JWT_SECRET
    ↓
jwt.sign()
    ↓
JWT Token

JWT Token
    ↓
jwt.verify()
    ↓
JWT_SECRET
    ↓
Valid / Invalid