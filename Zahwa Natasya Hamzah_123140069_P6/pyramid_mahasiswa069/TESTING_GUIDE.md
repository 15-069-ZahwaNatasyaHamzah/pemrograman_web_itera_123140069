# Testing Guide - Aplikasi Manajemen Matakuliah

Panduan lengkap untuk testing API endpoints Matakuliah menggunakan berbagai tools.

## Daftar Isi
- [Testing dengan curl](#testing-dengan-curl)
- [Testing dengan Postman](#testing-dengan-postman)
- [Testing dengan Python requests](#testing-dengan-python-requests)
- [Unit Testing](#unit-testing)
- [Checklist Pengujian](#checklist-pengujian)

## Testing dengan curl

### Prerequisites
- Pastikan PostgreSQL sudah running
- Pastikan aplikasi Pyramid sudah berjalan di `http://localhost:6543`
- Migrasi database sudah dilakukan

### Test 1: GET All Matakuliah

**Command:**
```powershell
curl -X GET http://localhost:6543/api/matakuliah
```

**Expected Response (200):**
```json
{
    "success": true,
    "message": "Berhasil mengambil 0 data matakuliah",
    "matakuliahs": []
}
```

### Test 2: POST - Create Matakuliah

**Command:**
```powershell
curl -X POST http://localhost:6543/api/matakuliah `
  -H "Content-Type: application/json" `
  -d '{
    "kode_mk": "IF101",
    "nama_mk": "Algoritma dan Pemrograman",
    "sks": 3,
    "semester": 1
  }'
```

**Expected Response (201):**
```json
{
    "success": true,
    "message": "Matakuliah berhasil ditambahkan",
    "matakuliah": {
        "id": 1,
        "kode_mk": "IF101",
        "nama_mk": "Algoritma dan Pemrograman",
        "sks": 3,
        "semester": 1
    }
}
```

### Test 3: Tambah Matakuliah Lagi

**Command:**
```powershell
curl -X POST http://localhost:6543/api/matakuliah `
  -H "Content-Type: application/json" `
  -d '{
    "kode_mk": "IF102",
    "nama_mk": "Struktur Data",
    "sks": 3,
    "semester": 2
  }'
```

**Expected Response (201):**
```json
{
    "success": true,
    "message": "Matakuliah berhasil ditambahkan",
    "matakuliah": {
        "id": 2,
        "kode_mk": "IF102",
        "nama_mk": "Struktur Data",
        "sks": 3,
        "semester": 2
    }
}
```

### Test 4: GET All Matakuliah (After Create)

**Command:**
```powershell
curl -X GET http://localhost:6543/api/matakuliah
```

**Expected Response (200):**
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
            "semester": 2
        }
    ]
}
```

### Test 5: GET Detail Matakuliah

**Command:**
```powershell
curl -X GET http://localhost:6543/api/matakuliah/1
```

**Expected Response (200):**
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

### Test 6: PUT - Update Matakuliah

**Command:**
```powershell
curl -X PUT http://localhost:6543/api/matakuliah/1 `
  -H "Content-Type: application/json" `
  -d '{
    "nama_mk": "Algoritma dan Pemrograman (Lanjutan)",
    "sks": 4
  }'
```

**Expected Response (200):**
```json
{
    "success": true,
    "message": "Matakuliah berhasil diupdate",
    "matakuliah": {
        "id": 1,
        "kode_mk": "IF101",
        "nama_mk": "Algoritma dan Pemrograman (Lanjutan)",
        "sks": 4,
        "semester": 1
    }
}
```

### Test 7: DELETE - Hapus Matakuliah

**Command:**
```powershell
curl -X DELETE http://localhost:6543/api/matakuliah/2
```

**Expected Response (200):**
```json
{
    "success": true,
    "message": "Matakuliah berhasil dihapus"
}
```

### Test 8: GET - Verify Delete

**Command:**
```powershell
curl -X GET http://localhost:6543/api/matakuliah
```

**Expected Response (200):**
```json
{
    "success": true,
    "message": "Berhasil mengambil 1 data matakuliah",
    "matakuliahs": [
        {
            "id": 1,
            "kode_mk": "IF101",
            "nama_mk": "Algoritma dan Pemrograman (Lanjutan)",
            "sks": 4,
            "semester": 1
        }
    ]
}
```

### Test 9: Error Cases - Duplicate kode_mk

**Command:**
```powershell
curl -X POST http://localhost:6543/api/matakuliah `
  -H "Content-Type: application/json" `
  -d '{
    "kode_mk": "IF101",
    "nama_mk": "Duplicate Course",
    "sks": 3,
    "semester": 1
  }'
```

**Expected Response (409):**
```json
{
    "success": false,
    "message": "Kode mata kuliah sudah terdaftar",
    "error": "Duplicate kode_mk"
}
```

### Test 10: Error Cases - Missing Required Field

**Command:**
```powershell
curl -X POST http://localhost:6543/api/matakuliah `
  -H "Content-Type: application/json" `
  -d '{
    "kode_mk": "IF103",
    "sks": 3,
    "semester": 1
  }'
```

**Expected Response (400):**
```json
{
    "success": false,
    "message": "Field nama_mk wajib diisi",
    "error": "Missing required field: nama_mk"
}
```

### Test 11: Error Cases - Invalid Data Type

**Command:**
```powershell
curl -X POST http://localhost:6543/api/matakuliah `
  -H "Content-Type: application/json" `
  -d '{
    "kode_mk": "IF104",
    "nama_mk": "Test Course",
    "sks": "invalid",
    "semester": 1
  }'
```

**Expected Response (400):**
```json
{
    "success": false,
    "message": "SKS dan Semester harus berupa angka positif",
    "error": "..."
}
```

### Test 12: Error Cases - Not Found

**Command:**
```powershell
curl -X GET http://localhost:6543/api/matakuliah/999
```

**Expected Response (404):**
```json
{
    "success": false,
    "message": "Matakuliah dengan ID 999 tidak ditemukan",
    "error": "Not Found"
}
```

## Testing dengan Postman

### Import Collection

1. **Create Collection:**
   - Klik `Collections` > `Create new collection`
   - Nama: `Matakuliah API`

2. **Add Requests:**

### GET All Matakuliah

- **Method:** GET
- **URL:** `http://localhost:6543/api/matakuliah`
- **Headers:** None
- **Body:** None

### POST Create

- **Method:** POST
- **URL:** `http://localhost:6543/api/matakuliah`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "kode_mk": "IF101",
    "nama_mk": "Algoritma dan Pemrograman",
    "sks": 3,
    "semester": 1
  }
  ```

### GET Detail

- **Method:** GET
- **URL:** `http://localhost:6543/api/matakuliah/1`
- **Headers:** None
- **Body:** None

### PUT Update

- **Method:** PUT
- **URL:** `http://localhost:6543/api/matakuliah/1`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "nama_mk": "Algoritma dan Pemrograman (Updated)",
    "sks": 4
  }
  ```

### DELETE

- **Method:** DELETE
- **URL:** `http://localhost:6543/api/matakuliah/1`
- **Headers:** None
- **Body:** None

## Testing dengan Python requests

### Create test_api.py

```python
import requests
import json

BASE_URL = "http://localhost:6543/api"

def test_get_all():
    """Test GET semua matakuliah"""
    response = requests.get(f"{BASE_URL}/matakuliah")
    print("GET All Matakuliah:")
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    print()

def test_create():
    """Test POST create matakuliah"""
    data = {
        "kode_mk": "IF101",
        "nama_mk": "Algoritma dan Pemrograman",
        "sks": 3,
        "semester": 1
    }
    response = requests.post(
        f"{BASE_URL}/matakuliah",
        json=data,
        headers={"Content-Type": "application/json"}
    )
    print("POST Create Matakuliah:")
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    print()
    return response.json()['matakuliah']['id']

def test_get_detail(mk_id):
    """Test GET detail matakuliah"""
    response = requests.get(f"{BASE_URL}/matakuliah/{mk_id}")
    print(f"GET Detail Matakuliah (ID={mk_id}):")
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    print()

def test_update(mk_id):
    """Test PUT update matakuliah"""
    data = {
        "nama_mk": "Algoritma dan Pemrograman (Updated)",
        "sks": 4
    }
    response = requests.put(
        f"{BASE_URL}/matakuliah/{mk_id}",
        json=data,
        headers={"Content-Type": "application/json"}
    )
    print(f"PUT Update Matakuliah (ID={mk_id}):")
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    print()

def test_delete(mk_id):
    """Test DELETE matakuliah"""
    response = requests.delete(f"{BASE_URL}/matakuliah/{mk_id}")
    print(f"DELETE Matakuliah (ID={mk_id}):")
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    print()

def test_error_duplicate():
    """Test error duplicate kode_mk"""
    data = {
        "kode_mk": "IF101",
        "nama_mk": "Duplicate",
        "sks": 3,
        "semester": 1
    }
    response = requests.post(
        f"{BASE_URL}/matakuliah",
        json=data,
        headers={"Content-Type": "application/json"}
    )
    print("Error Test - Duplicate kode_mk:")
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    print()

if __name__ == "__main__":
    print("=" * 60)
    print("Testing Matakuliah API")
    print("=" * 60)
    print()
    
    test_get_all()
    mk_id = test_create()
    test_get_detail(mk_id)
    test_update(mk_id)
    test_delete(mk_id)
    test_get_all()
    
    print("=" * 60)
    print("Testing Complete")
    print("=" * 60)
```

### Jalankan Test

```bash
pip install requests
python test_api.py
```

## Unit Testing

### Jalankan Test dengan pytest

```bash
pytest pyramid_mahasiswa069/
```

### Jalankan Test dengan Coverage

```bash
pytest --cov=pyramid_mahasiswa069 --cov-report=html
```

## Checklist Pengujian

### ✓ CRUD Operations

- [ ] **READ (GET All)**
  - Status: 200
  - Response berisi array matakuliahs
  - Message sesuai

- [ ] **READ (GET Detail)**
  - Status: 200 (item ada)
  - Status: 404 (item tidak ada)
  - Response berisi detail matakuliah

- [ ] **CREATE (POST)**
  - Status: 201 (success)
  - Status: 400 (missing field)
  - Status: 409 (duplicate kode_mk)
  - Response berisi data matakuliah yang dibuat

- [ ] **UPDATE (PUT)**
  - Status: 200 (success)
  - Status: 400 (invalid data)
  - Status: 404 (item tidak ada)
  - Status: 409 (duplicate kode_mk)
  - Response berisi data yang ter-update

- [ ] **DELETE**
  - Status: 200 (success)
  - Status: 404 (item tidak ada)
  - Item benar-benar dihapus

### ✓ Validation

- [ ] Field `kode_mk` wajib diisi
- [ ] Field `nama_mk` wajib diisi
- [ ] Field `sks` wajib diisi dan berupa angka > 0
- [ ] Field `semester` wajib diisi dan berupa angka > 0
- [ ] `kode_mk` harus unique
- [ ] Error handling untuk invalid JSON

### ✓ Database

- [ ] Migrasi berhasil membuat tabel
- [ ] Data tersimpan di PostgreSQL
- [ ] Foreign key dan constraint berfungsi
- [ ] Unique constraint pada kode_mk berfungsi

### ✓ Response Format

- [ ] Semua response berformat JSON
- [ ] Semua response berisi `success` (boolean)
- [ ] Semua response berisi `message` (string)
- [ ] Error response berisi `error` (string)
- [ ] Success response berisi data yang relevan

---

**Tips:**
1. Selalu test error cases
2. Test dengan data boundary (empty string, null, negative number)
3. Verifikasi data di database setelah setiap operasi
4. Catat hasil testing untuk dokumentasi
