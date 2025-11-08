# Aplikasi Manajemen Buku Pribadi

Aplikasi React untuk mengelola koleksi buku pribadi. Pengguna bisa menambahkan, memperbarui, dan menghapus entri buku serta menyaring koleksi berdasarkan status (Dimiliki, Sedang Dibaca, Ingin Dibeli). Dibangun sebagai latihan untuk mempraktikkan fitur React modern: Context API, custom hooks, dan React Router.

## 🚀 Deskripsi Aplikasi

Aplikasi ini memungkinkan pengguna untuk:
* **Menambah** buku baru (judul, penulis, status).
* **Mengedit** informasi buku yang sudah ada.
* **Menghapus** buku dari daftar.
* **Mencari** buku berdasarkan judul atau penulis.
* **Memfilter** buku berdasarkan status: "Dimiliki", "Sedang Dibaca", atau "Ingin Dibeli".
* Melihat **Statistik** total koleksi buku.

## 📸 Screenshot Antarmuka

**Halaman Home**
![buku1](https://github.com/user-attachments/assets/ccbbb24e-a016-436c-9a53-e9b0eebeb010)
![buku2](https://github.com/user-attachments/assets/479d2b5e-7cac-48b6-a8b8-58c78cb183ab)

**Halaman Statistik**
![buku3](https://github.com/user-attachments/assets/459fa8fa-774c-4a90-acbd-ac4562937035)


---

## ⚙️ Instruksi Instalasi dan Menjalankan

### 1. Instalasi
Pastikan Anda memiliki [Node.js](https://nodejs.org/) (versi LTS).

1.  Clone atau download repositori ini.
2.  Masuk ke folder proyek:
    ```bash
    cd nama-folder-proyek
    ```
3.  Install semua dependensi yang diperlukan:
    ```bash
    npm install
    ```

### 2. Menjalankan Aplikasi
Untuk menjalankan aplikasi dalam mode development (pengembangan):
```bash
npm run dev
```

Aplikasi akan terbuka di browser pada alamat `http://localhost:5173`.

---

## 💡 Penjelasan Fitur React yang Digunakan

Aplikasi ini dibangun dengan memanfaatkan beberapa fitur inti dan modern React untuk menciptakan aplikasi yang efisien dan mudah dikelola:

### React Router (v6)

**Fungsi:** Digunakan untuk mengelola navigasi client-side (perpindahan antar halaman).

**Penerapan:** Memungkinkan aplikasi memiliki beberapa "halaman" (seperti Home dan Statistik) yang diakses melalui URL berbeda tanpa memuat ulang seluruh halaman web. Ini menciptakan pengalaman pengguna yang cepat dan mulus.

### Context API

**Fungsi:** Digunakan untuk manajemen state global.

**Penerapan:** Alih-alih meneruskan props (seperti daftar buku atau fungsi `handleTambahBuku`) secara berulang-ulang ke komponen-komponen anak (dikenal sebagai "prop drilling"), Context API menyediakan state global. Dalam proyek ini, Context digunakan untuk menyimpan daftar buku, sehingga komponen `BookList` dan `StatsPage` bisa mengakses data yang sama tanpa perlu props yang rumit.

### Custom Hooks

**Fungsi:** Untuk mengenkapsulasi dan menggunakan kembali logika yang memiliki state (stateful logic).

**Penerapan:** (Contoh) Logika untuk menyimpan dan mengambil data buku dari Local Storage kemungkinan diabstraksi ke dalam custom hook (misalnya `useLocalStorage`). Ini membuat komponen utama (seperti `App.js`) lebih bersih dan fokus pada tampilan, sementara logika penyimpanan data ditangani secara terpisah oleh hook ini.

### React Hooks (useState, useEffect)

* `useState` digunakan untuk mengelola state lokal di dalam komponen, seperti mengelola data input pada form tambah/edit buku dan state untuk query pencarian.
* `useEffect` digunakan untuk menangani side effects, seperti menyimpan data ke Local Storage setiap kali daftar buku berubah.

---

## 💬 Komentar dalam Kode

Komentar penjelasan telah ditambahkan di seluruh basis kode pada bagian-bagian yang dianggap penting atau kompleks.

* Komentar ini menjelaskan tujuan dari komponen-komponen utama.
* Menjelaskan logika di dalam fungsi-fungsi (seperti fungsi edit, hapus, atau filter).
* Memberikan konteks untuk struktur state yang digunakan dalam Context API.

Tujuan dari komentar ini adalah untuk membuat kode lebih mudah dibaca, dipahami, dan dipelihara oleh developer lain (atau diri sendiri di masa depan).

---

## 🧪 Laporan Testing (Screenshots Hasil Test)
![npm run](https://github.com/user-attachments/assets/0ed6ccfc-9cb4-44c3-ab39-6ae8d8db8301)
