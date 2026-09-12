# Request Flow

## General Flow

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
Response

## Protected Request

Client
  ↓
Authorization Header
  ↓
Auth Middleware
  ↓
Verify JWT
  ↓
Controller
  ↓
Service
  ↓
Database