# API Response

## Success

{
  "success": true,
  "message": "Data berhasil ditemukan",
  "data": []
}

## Error

{
  "success": false,
  "message": "Terjadi kesalahan"
}

## Authentication Error

{
  "success": false,
  "message": "Token tidak ditemukan"
}

## HTTP Status

200 → Success
201 → Created
400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found
500 → Internal Server Error