# Proyek Sistem Manajemen Perpustakaan Sederhana

Proyek ini adalah implementasi sistem manajemen perpustakaan sederhana menggunakan Python dengan konsep Object-Oriented Programming (OOP).

## 1. Penjelasan Program dan Fitur

Program ini mensimulasikan perpustakaan digital sederhana yang dapat menyimpan dan mengelola koleksi item, yang terdiri dari Buku dan Majalah.

**Konsep OOP yang Diterapkan:**
* **Abstract Class & Inheritance:** Menggunakan class abstract `LibraryItem` sebagai cetak biru, yang kemudian diturunkan (inherit) menjadi class `Book` dan `Magazine`.
* **Encapsulation:** Melindungi data penting (seperti `__id` item dan `__items` di library) menggunakan *access modifier* private (`__`) dan protected (`_`). Data tersebut diakses secara aman menggunakan *property decorator* (`@property`).
* **Polymorphism:** Memanfaatkan metode `display_details()` yang memiliki implementasi berbeda di class `Book` dan `Magazine`. Class `Library` dapat memanggil metode ini tanpa perlu tahu tipe objek pastinya.

**Fitur Utama:**
1.  **Menambahkan Item:** Dapat menambahkan objek `Book` atau `Magazine` baru ke dalam koleksi perpustakaan.
2.  **Menampilkan Semua Item:** Menampilkan daftar lengkap semua item (buku dan majalah) yang ada di perpustakaan beserta detailnya.
3.  **Mencari Item:** Melakukan pencarian item berdasarkan **ID** (contoh: `B001`) atau **Judul** (tidak case-sensitive, contoh: `national geographic`).

## 2. Screenshot Hasil Running Program

( **Catatan untuk Anda:** Jalankan file `main.py` di terminal Anda, lalu ambil screenshot dari output terminal tersebut dan letakkan file gambarnya di sini.)

**Contoh Tampilan Output di Terminal:**

```bash
Sistem Manajemen Perpustakaan Dijalankan...

--- Menambahkan Item ---
[INFO] Berhasil menambahkan: 'Dasar-Dasar OOP Python'
[INFO] Berhasil menambahkan: 'Belajar Struktur Data'
[INFO] Berhasil menambahkan: 'National Geographic'
[ERROR] Gagal menambahkan. Objek bukan merupakan LibraryItem.

=== DAFTAR SEMUA ITEM DI PERPUSTAKAAN ===
--- BUKU ---
  ID       : B001
  Judul    : Dasar-Dasar OOP Python
  Penulis  : Alex Budiman
------------
--- BUKU ---
  ID       : B002
  Judul    : Belajar Struktur Data
  Penulis  : Citra Lestari
------------
--- MAJALAH ---
  ID      : M001
  Judul   : National Geographic
  Edisi   : November 2025
---------------

=== HASIL PENCARIAN UNTUK: 'B001' ===
--- BUKU ---
  ID       : B001
  Judul    : Dasar-Dasar OOP Python
  Penulis  : Alex Budiman
------------

=== HASIL PENCARIAN UNTUK: 'national geographic' ===
--- MAJALAH ---
  ID      : M001
  Judul   : National Geographic
  Edisi   : November 2025
---------------

=== HASIL PENCARIAN UNTUK: 'X999' ===
[INFO] Item tidak ditemukan.