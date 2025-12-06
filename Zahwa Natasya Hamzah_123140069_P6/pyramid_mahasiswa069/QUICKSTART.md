# Quick Start Guide

Panduan cepat untuk menjalankan aplikasi Manajemen Matakuliah.

## Step 1: Setup PostgreSQL Database

### Windows

```powershell
# Masuk ke PostgreSQL
psql -U postgres

# Di dalam psql prompt, jalankan:
CREATE DATABASE matakuliah_db;
\q
```

### Linux/Mac

```bash
sudo -u postgres psql
CREATE DATABASE matakuliah_db;
\q
```

## Step 2: Setup Python Environment

```powershell
# Buat virtual environment
python -m venv venv

# Aktifkan virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Atau setup development mode
pip install -e .
```

## Step 3: Database Migrasi

```powershell
alembic upgrade head
```

## Step 4: Run Server

```powershell
pserve development.ini
```

Server akan berjalan di: **http://localhost:6543**

## Step 5: Test API

Buka PowerShell baru dan jalankan:

```powershell
# Test 1: GET All (harus kosong)
curl -X GET http://localhost:6543/api/matakuliah

# Test 2: POST - Create
curl -X POST http://localhost:6543/api/matakuliah `
  -H "Content-Type: application/json" `
  -d '{
    "kode_mk": "IF101",
    "nama_mk": "Algoritma dan Pemrograman",
    "sks": 3,
    "semester": 1
  }'

# Test 3: GET All (harus ada 1 data)
curl -X GET http://localhost:6543/api/matakuliah

# Test 4: GET Detail
curl -X GET http://localhost:6543/api/matakuliah/1

# Test 5: PUT Update
curl -X PUT http://localhost:6543/api/matakuliah/1 `
  -H "Content-Type: application/json" `
  -d '{"nama_mk": "Algoritma dan Pemrograman (Updated)"}'

# Test 6: DELETE
curl -X DELETE http://localhost:6543/api/matakuliah/1
```

## Troubleshooting

### Error: "database connection error"
- Cek apakah PostgreSQL sudah running
- Cek connection string di `development.ini`
- Pastikan database `matakuliah_db` sudah dibuat

### Error: "No such command"
- Pastikan virtual environment sudah diaktifkan
- Install dependencies: `pip install -r requirements.txt`

### Error: "relation 'matakuliah' does not exist"
- Jalankan migrasi: `alembic upgrade head`
- Verifikasi dengan: `alembic current`

### Error 404 on /api/matakuliah
- Cek apakah server sudah running (`pserve development.ini`)
- Cek routes di `pyramid_mahasiswa069/routes.py`

## File Penting

- `pyramid_mahasiswa069/models/mymodel.py` - Model Matakuliah
- `pyramid_mahasiswa069/views/default.py` - API endpoints
- `pyramid_mahasiswa069/routes.py` - URL routes
- `development.ini` - Database configuration
- `pyramid_mahasiswa069/alembic/versions/001_create_matakuliah_table.py` - Database migration

## Documentation

- `README.md` - Dokumentasi lengkap
- `TESTING_GUIDE.md` - Panduan testing komprehensif

---

Semoga sukses! 🚀
