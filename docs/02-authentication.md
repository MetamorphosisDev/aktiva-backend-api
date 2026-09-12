# Authentication

## Register

Client
  ↓
Register Controller
  ↓
Register Service
  ↓
Hash Password
  ↓
Database

## Login

Client
  ↓
Login Controller
  ↓
Login Service
  ↓
Check Email & Password
  ↓
Generate JWT
  ↓
Return Token

## Protected Endpoint

Request
  ↓
Auth Middleware
  ↓
JWT Verification
  ↓
Valid → next()
Invalid → 401