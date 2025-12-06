# Aplikasi Manajemen Matakuliah dengan Pyramid dan PostgreSQL

Aplikasi API REST untuk manajemen data matakuliah yang dibangun menggunakan framework Pyramid dan PostgreSQL.

## Daftar Isi
- [Fitur](#fitur)
- [Persyaratan](#persyaratan)
- [Instalasi](#instalasi)
- [Konfigurasi Database](#konfigurasi-database)
- [Migrasi Database](#migrasi-database)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Struktur Proyek](#struktur-proyek)

## Fitur

### Model Data
Aplikasi menyediakan model `Matakuliah` dengan atribut berikut:

| Atribut | Tipe | Deskripsi | Constraint |
|---------|------|-----------|-----------|
| id | Integer | Primary key | Auto increment |
| kode_mk | String(50) | Kode mata kuliah | Unique, Not null, Index |
| nama_mk | String(255) | Nama mata kuliah | Not null |
| sks | Integer | Jumlah SKS | Not null |
| semester | Integer | Semester pengambilan | Not null |

**Contoh Model Matakuliah:**
```python
class Matakuliah(Base):
    __tablename__ = 'matakuliah'
    
    id = Column(Integer, primary_key=True)
    kode_mk = Column(String(50), unique=True, nullable=False, index=True)
    nama_mk = Column(String(255), nullable=False)
    sks = Column(Integer, nullable=False)
    semester = Column(Integer, nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'kode_mk': self.kode_mk,
            'nama_mk': self.nama_mk,
            'sks': self.sks,
            'semester': self.semester,
        }
```

### API Endpoints

Implementasikan endpoint untuk operasi CRUD dengan validasi dan error handling:

| HTTP Method | URL Pattern | Deskripsi | Status Code |
|-------------|------------|-----------|------------|
| GET | /api/matakuliah | Mendapatkan semua matakuliah | 200 |
| GET | /api/matakuliah/{id} | Mendapatkan detail satu matakuliah | 200, 404 |
| POST | /api/matakuliah | Menambahkan matakuliah baru | 201, 400, 409 |
| PUT | /api/matakuliah/{id} | Mengupdate data matakuliah | 200, 400, 404, 409 |
| DELETE | /api/matakuliah/{id} | Menghapus data matakuliah | 200, 404 |

## Persyaratan

### Software
- Python 3.8+
- PostgreSQL 10+
- pip atau virtualenv

### Dependencies
```
alembic
plaster_pastedeploy
pyramid >= 1.9
pyramid_debugtoolbar
pyramid_jinja2
pyramid_retry
pyramid_tm
SQLAlchemy
transaction
zope.sqlalchemy
waitress
psycopg2-binary
```

## Instalasi

### 1. Membuat Virtual Environment

```bash
# Windows PowerShell
python -m venv venv
.\venv\Scripts\Activate.ps1

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### 2. Instalasi Dependencies

```bash
pip install -r requirements.txt
```

Atau install secara manual:

```bash
pip install pyramid
pip install pyramid_tm
pip install pyramid_jinja2
pip install SQLAlchemy
pip install alembic
pip install transaction
pip install zope.sqlalchemy
pip install psycopg2-binary
pip install waitress
```

### 3. Setup Development Mode

```bash
pip install -e .
```

## Konfigurasi Database

### 1. Membuat Database PostgreSQL

```sql
-- Login ke PostgreSQL
psql -U postgres

-- Buat database baru
CREATE DATABASE matakuliah_db;

-- Keluar dari psql
\q
```

### 2. Konfigurasi Connection String

Edit file `development.ini` dan ubah konfigurasi database:

```ini
[app:main]
sqlalchemy.url = postgresql://postgres:password@localhost:5432/matakuliah_db
```

**Format Connection String PostgreSQL:**
```
postgresql://username:password@host:port/database_name
```

**Penjelasan:**
- `username`: Username PostgreSQL (default: postgres)
- `password`: Password PostgreSQL
- `host`: Host server (default: localhost)
- `port`: Port PostgreSQL (default: 5432)
- `database_name`: Nama database (matakuliah_db)

## Migrasi Database

### 1. Jalankan Migrasi

```bash
alembic upgrade head
```

Perintah ini akan:
- Membuat tabel `matakuliah` di database PostgreSQL
- Membuat index unique pada kolom `kode_mk`
- Menginisialisasi schema database

### 2. Verifikasi Migrasi

Untuk melihat status migrasi:

```bash
alembic current
alembic history
```

### 3. Rollback Migrasi (Jika Perlu)

```bash
# Rollback satu level
alembic downgrade -1

# Rollback ke versi tertentu
alembic downgrade 001
```

## Menjalankan Aplikasi

### 1. Start Server Development

```bash
pserve development.ini
```

Server akan berjalan di `http://localhost:6543`

### 2. Alternatif - Menggunakan Python Langsung

```bash
python -m pyramid.scripts.pserve development.ini
```

## API Endpoints

### 1. GET - Mendapatkan Semua Matakuliah

**Request:**
```bash
curl -X GET http://localhost:6543/api/matakuliah
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Berhasil mengambil 2 data matakuliah",
    "matakuliahs": [
        {
            "id": 1,
            "kode_mk": "IF101",
            "nama_mk": "Algoritma dan Pemrograman",
            "sks": 3,
            "semester": 1
        },
        {
            "id": 2,
            "kode_mk": "IF102",
            "nama_mk": "Struktur Data",
            "sks": 3,
            "semester": 1
        }
    ]
}
```

### 2. GET - Mendapatkan Detail Satu Matakuliah

**Request:**
```bash
curl -X GET http://localhost:6543/api/matakuliah/1
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Berhasil mengambil detail matakuliah",
    "matakuliah": {
        "id": 1,
        "kode_mk": "IF101",
        "nama_mk": "Algoritma dan Pemrograman",
        "sks": 3,
        "semester": 1
    }
}
```

**Response Error - Not Found (404):**
```json
{
    "success": false,
    "message": "Matakuliah dengan ID 999 tidak ditemukan",
    "error": "Not Found"
}
```

### 3. POST - Menambahkan Matakuliah Baru

**Request:**
```bash
curl -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d '{
    "kode_mk": "IF103",
    "nama_mk": "Basis Data",
    "sks": 3,
    "semester": 2
  }'
```

**Response Success (201):**
```json
{
    "success": true,
    "message": "Matakuliah berhasil ditambahkan",
    "matakuliah": {
        "id": 3,
        "kode_mk": "IF103",
        "nama_mk": "Basis Data",
        "sks": 3,
        "semester": 2
    }
}
```

**Response Error - Missing Field (400):**
```json
{
    "success": false,
    "message": "Field nama_mk wajib diisi",
    "error": "Missing required field: nama_mk"
}
```

**Response Error - Duplicate Code (409):**
```json
{
    "success": false,
    "message": "Kode mata kuliah sudah terdaftar",
    "error": "Duplicate kode_mk"
}
```

### 4. PUT - Mengupdate Data Matakuliah

**Request:**
```bash
curl -X PUT http://localhost:6543/api/matakuliah/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nama_mk": "Algoritma dan Pemrograman (Updated)",
    "sks": 4
  }'
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Matakuliah berhasil diupdate",
    "matakuliah": {
        "id": 1,
        "kode_mk": "IF101",
        "nama_mk": "Algoritma dan Pemrograman (Updated)",
        "sks": 4,
        "semester": 1
    }
}
```

### 5. DELETE - Menghapus Matakuliah

**Request:**
```bash
curl -X DELETE http://localhost:6543/api/matakuliah/1
```

**Response Success (200):**
```json
{
    "success": true,
    "message": "Matakuliah berhasil dihapus"
}
```

## Testing

### Menggunakan curl (Command Line)

**Test 1 - GET All Matakuliah:**
```bash
curl -X GET http://localhost:6543/api/matakuliah
```

**Test 2 - POST New Matakuliah:**
```bash
curl -X POST http://localhost:6543/api/matakuliah ^
  -H "Content-Type: application/json" ^
  -d "{\"kode_mk\":\"IF101\",\"nama_mk\":\"Algoritma dan Pemrograman\",\"sks\":3,\"semester\":1}"
```

**Test 3 - GET Detail (sesuaikan ID):**
```bash
curl -X GET http://localhost:6543/api/matakuliah/1
```

**Test 4 - PUT Update (sesuaikan ID):**
```bash
curl -X PUT http://localhost:6543/api/matakuliah/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"nama_mk\":\"Algoritma dan Pemrograman (Updated)\"}"
```

**Test 5 - DELETE (sesuaikan ID):**
```bash
curl -X DELETE http://localhost:6543/api/matakuliah/1
```

### Menggunakan Postman

1. Import endpoints ke Postman
2. Set request type (GET, POST, PUT, DELETE)
3. Untuk POST/PUT, set Body ke JSON dan masukkan data
4. Kirim request

### Validasi Respons

Setiap endpoint harus memverifikasi:
1. Status code yang sesuai (200, 201, 400, 404, 409, 500)
2. Response format JSON dengan struktur yang benar
3. Message dan error description yang relevan

## Struktur Proyek

```
pyramid_mahasiswa069/
├── pyramid_mahasiswa069/           # Main application package
│   ├── __init__.py                 # Application entry point
│   ├── routes.py                   # URL routes
│   ├── models/
│   │   ├── __init__.py
│   │   ├── meta.py                 # SQLAlchemy configuration
│   │   └── mymodel.py              # Matakuliah model definition
│   ├── views/
│   │   ├── __init__.py
│   │   └── default.py              # API view handlers (CRUD endpoints)
│   ├── templates/
│   ├── static/
│   └── alembic/
│       ├── versions/
│       │   └── 001_create_matakuliah_table.py
│       └── env.py
├── setup.py                        # Package setup configuration
├── development.ini                 # Development configuration
├── production.ini                  # Production configuration
└── README.md                       # This file
```

## Penjelasan Kode

### Models (mymodel.py)
- **Matakuliah class**: Model untuk tabel matakuliah
- **to_dict()**: Method untuk konversi object ke dictionary
- **Validasi**: Constraints pada database level (unique, nullable)

### Views (default.py)
- **get_all_matakuliah**: Menampilkan semua data matakuliah
- **get_matakuliah_detail**: Menampilkan detail satu matakuliah
- **create_matakuliah**: Membuat matakuliah baru dengan validasi
- **update_matakuliah**: Update data matakuliah dengan validasi
- **delete_matakuliah**: Menghapus data matakuliah

### Routes (routes.py)
- `GET /api/matakuliah`: Get all
- `GET /api/matakuliah/{id}`: Get by ID
- `POST /api/matakuliah`: Create
- `PUT /api/matakuliah/{id}`: Update
- `DELETE /api/matakuliah/{id}`: Delete

### Configuration (development.ini)
- `sqlalchemy.url`: PostgreSQL connection string
- `pyramid.reload_templates`: Auto-reload templates di development

## Error Handling

Aplikasi menangani error berikut:

1. **400 Bad Request**: Invalid input atau format JSON salah
2. **404 Not Found**: Resource tidak ditemukan
3. **409 Conflict**: Duplicate data (kode_mk sudah ada)
4. **500 Internal Server Error**: Database connection error atau unexpected error

Setiap error response berisi:
- `success`: false
- `message`: Pesan error yang user-friendly
- `error`: Detail error teknis

## Tips Pengerjaan

1. Gunakan kode dari praktikum sebagai dasar
2. Ubah model dan view untuk menyesuaikan dengan Matakuliah
3. Ingat untuk menambahkan `request_method` pada setiap route untuk membedakan CRUD operation
4. Jalankan migrasi sebelum menguji API
5. Test setiap endpoint dengan curl atau Postman
6. Verifikasi response sesuai dengan yang diharapkan

## Kriteria Penilaian

| Aspek | Bobot | Detail |
|-------|-------|--------|
| Model Data | 30% | Model Matakuliah dengan atribut lengkap, validasi, dan method to_dict() |
| API Endpoints | 40% | Implementasi lengkap CRUD dengan validasi dan error handling |
| Dokumentasi dan Kerapian Kode | 30% | README.md lengkap, code comments, dan struktur kode yang rapi |

---

