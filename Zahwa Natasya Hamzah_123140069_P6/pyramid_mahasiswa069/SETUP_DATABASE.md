# SETUP DAN KONFIGURASI DATABASE

## Persiapan Awal

### 1. Install PostgreSQL

#### Windows
- Download dari: https://www.postgresql.org/download/windows/
- Install dengan default settings
- Default password: postgres
- Default port: 5432

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

#### macOS
```bash
brew install postgresql
```

### 2. Verifikasi PostgreSQL Running

#### Windows PowerShell
```powershell
psql --version
psql -U postgres
```

#### Linux/Mac
```bash
sudo -u postgres psql
```

## Membuat Database

### Method 1: Menggunakan psql Command Line

```bash
# Login ke PostgreSQL
psql -U postgres

# Di dalam psql prompt:
CREATE DATABASE matakuliah_db;

# Verifikasi database dibuat
\l

# Exit
\q
```

### Method 2: Menggunakan pgAdmin GUI

1. Buka pgAdmin
2. Klik kanan pada Databases
3. Create > Database
4. Nama: `matakuliah_db`
5. Klik Save

## Konfigurasi Connection String

Edit file `development.ini`:

```ini
[app:main]
sqlalchemy.url = postgresql://postgres:password@localhost:5432/matakuliah_db
```

### Format Connection String

```
postgresql://username:password@host:port/database_name
```

**Contoh:**
- Username: `postgres` (default)
- Password: `password` (sesuaikan dengan password Anda)
- Host: `localhost` (default)
- Port: `5432` (default PostgreSQL)
- Database: `matakuliah_db` (nama database yang baru dibuat)

## Verifikasi Koneksi

```bash
# Test connection string
psql postgresql://postgres:password@localhost:5432/matakuliah_db

# Jika berhasil, akan masuk ke prompt psql
```

## Setup Python Environment

### 1. Create Virtual Environment

```powershell
# Windows
python -m venv venv
.\venv\Scripts\Activate.ps1

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Install Package in Development Mode

```bash
pip install -e .
```

## Database Migrasi

### 1. Initialize Alembic (Jika Belum Ada)

```bash
alembic init alembic
```

### 2. Generate Migration Script

```bash
alembic revision --autogenerate -m "create_matakuliah_table"
```

### 3. Jalankan Migration

```bash
alembic upgrade head
```

### 4. Verifikasi Migrasi

```bash
alembic current
alembic history
```

## Verifikasi Setup

### Check Table di Database

```bash
# Login ke database
psql -U postgres -d matakuliah_db

# List tables
\dt

# Describe table matakuliah
\d matakuliah

# Exit
\q
```

**Expected Output:**
```
             Table "public.matakuliah"
   Column   |          Type          | Collation | Nullable |
------------|------------------------|-----------|----------|
 id         | integer                |           | not null |
 kode_mk    | character varying(50)  |           | not null |
 nama_mk    | character varying(255) |           | not null |
 sks        | integer                |           | not null |
 semester   | integer                |           | not null |
```

### Jalankan Server

```bash
pserve development.ini
```

**Expected Output:**
```
Starting server in PID 1234.
Serving on http://127.0.0.1:6543
```

### Test API

Di terminal baru:

```powershell
curl -X GET http://localhost:6543/api/matakuliah
```

**Expected Response:**
```json
{
    "success": true,
    "message": "Berhasil mengambil 0 data matakuliah",
    "matakuliahs": []
}
```

## Troubleshooting

### Error: "FATAL: password authentication failed for user 'postgres'"

**Solution:**
1. Check password PostgreSQL Anda
2. Update connection string dengan password yang benar
3. Reset password PostgreSQL:
   ```bash
   psql -U postgres
   ALTER USER postgres WITH PASSWORD 'new_password';
   ```

### Error: "FATAL: database 'matakuliah_db' does not exist"

**Solution:**
1. Verifikasi database sudah dibuat:
   ```bash
   psql -U postgres -l
   ```
2. Jika belum ada, buat:
   ```bash
   psql -U postgres
   CREATE DATABASE matakuliah_db;
   ```

### Error: "relation 'matakuliah' does not exist"

**Solution:**
1. Jalankan migration:
   ```bash
   alembic upgrade head
   ```
2. Verifikasi:
   ```bash
   psql -U postgres -d matakuliah_db -c "\dt"
   ```

### Error: "psycopg2.OperationalError"

**Solution:**
1. Install psycopg2-binary:
   ```bash
   pip install psycopg2-binary
   ```
2. Pastikan PostgreSQL sudah running
3. Check connection string

## Quick Test Commands

Setelah setup selesai, jalankan commands ini untuk verify:

```powershell
# 1. Check PostgreSQL
psql --version

# 2. Check Python
python --version

# 3. Activate venv
.\venv\Scripts\Activate.ps1

# 4. Check Alembic
alembic --version

# 5. Check current migration
alembic current

# 6. Run server
pserve development.ini

# 7. In new terminal, test API
curl -X GET http://localhost:6543/api/matakuliah
```

## Production Deployment

Untuk production, update `production.ini`:

```ini
[app:main]
sqlalchemy.url = postgresql://username:password@prod-host:5432/matakuliah_db
pyramid.debug_authorization = false
pyramid.debug_notfound = false
pyramid.reload_templates = false
pyramid.includes = pyramid_tm

[server:main]
use = egg:waitress#main
listen = 0.0.0.0:6543
```

Deploy menggunakan:

```bash
pserve production.ini
```

---

**Catatan:** Untuk development, gunakan `development.ini`. Untuk production, gunakan `production.ini` dengan konfigurasi yang sesuai.
