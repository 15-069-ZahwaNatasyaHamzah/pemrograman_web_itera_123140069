# Inisialisasi data awal mahasiswa sesuai syarat (list berisi dictionary)
data_mahasiswa = [
    {
        "nama": "Andi Setiawan",
        "nim": "1001",
        "nilai_uts": 85,
        "nilai_uas": 90,
        "nilai_tugas": 88,
    },
    {
        "nama": "Budi Hartono",
        "nim": "1002",
        "nilai_uts": 70,
        "nilai_uas": 75,
        "nilai_tugas": 72,
    },
    {
        "nama": "Cahya Mentari",
        "nim": "1003",
        "nilai_uts": 90,
        "nilai_uas": 95,
        "nilai_tugas": 92,
    },
    {
        "nama": "Dewi Lestari",
        "nim": "1004",
        "nilai_uts": 45,
        "nilai_uas": 50,
        "nilai_tugas": 60,
    },
    {
        "nama": "Eka Permata",
        "nim": "1005",
        "nilai_uts": 60,
        "nilai_uas": 65,
        "nilai_tugas": 55,
    },
]

# --- FUNGSI-FUNGSI WAJIB ---

def hitung_nilai_akhir(uts, uas, tugas):
    """Fungsi untuk menghitung nilai akhir."""
    # Bobot: 30% UTS + 40% UAS + 30% Tugas
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)

def tentukan_grade(nilai_akhir):
    """Fungsi untuk menentukan grade berdasarkan nilai akhir."""
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"

def tampilkan_data(data_list):
    """Fungsi untuk menampilkan semua data mahasiswa dalam format tabel."""
    print("\n" + "=" * 80)
    print(f"{'Data Nilai Mahasiswa':^80}")
    print("=" * 80)
    # Header Tabel
    print(f"| {'No':<3} | {'NIM':<8} | {'Nama Mahasiswa':<20} | {'UTS':<5} | {'UAS':<5} | {'Tugas':<5} | {'Akhir':<6} | {'Grade':<5} |")
    print("-" * 80)

    if not data_list:
        print(f"| {'Tidak ada data untuk ditampilkan':^76} |")
    else:
        for i, mhs in enumerate(data_list, 1):
            nilai_akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
            grade = tentukan_grade(nilai_akhir)
            
            print(f"| {i:<3} | {mhs['nim']:<8} | {mhs['nama']:<20} | {mhs['nilai_uts']:<5} | {mhs['nilai_uas']:<5} | {mhs['nilai_tugas']:<5} | {nilai_akhir:<6.2f} | {grade:<5} |")
    
    print("-" * 80)

def cari_mahasiswa_tertinggi_terendah(data_list):
    """Fungsi untuk mencari mahasiswa dengan nilai akhir tertinggi dan terendah."""
    if not data_list:
        print("\n[!] Tidak ada data mahasiswa.")
        return

    tertinggi = data_list[0]
    terendah = data_list[0]
    
    nilai_tertinggi = hitung_nilai_akhir(tertinggi['nilai_uts'], tertinggi['nilai_uas'], tertinggi['nilai_tugas'])
    nilai_terendah = nilai_tertinggi

    for mhs in data_list[1:]:
        nilai_akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        
        if nilai_akhir > nilai_tertinggi:
            nilai_tertinggi = nilai_akhir
            tertinggi = mhs
        
        if nilai_akhir < nilai_terendah:
            nilai_terendah = nilai_akhir
            terendah = mhs
            
    print("\n--- Mahasiswa dengan Nilai Tertinggi ---")
    print(f"Nama  : {tertinggi['nama']} ({tertinggi['nim']})")
    print(f"Nilai : {nilai_tertinggi:.2f} (Grade {tentukan_grade(nilai_tertinggi)})")
    
    print("\n--- Mahasiswa dengan Nilai Terendah ---")
    print(f"Nama  : {terendah['nama']} ({terendah['nim']})")
    print(f"Nilai : {nilai_terendah:.2f} (Grade {tentukan_grade(nilai_terendah)})")

# --- FUNGSI-FUNGSI TAMBAHAN ---

def input_data_mahasiswa_baru():
    """Fungsi untuk menambah data mahasiswa baru."""
    print("\n--- Input Data Mahasiswa Baru ---")
    try:
        nama = input("Masukkan Nama   : ")
        nim = input("Masukkan NIM    : ")
        # Validasi sederhana agar NIM tidak duplikat
        for mhs in data_mahasiswa:
            if mhs['nim'] == nim:
                print(f"\n[!] Error: NIM {nim} sudah ada. Data dibatalkan.")
                return None # Kembalikan None jika gagal

        nilai_uts = float(input("Nilai UTS       : "))
        nilai_uas = float(input("Nilai UAS       : "))
        nilai_tugas = float(input("Nilai Tugas     : "))

        mahasiswa_baru = {
            "nama": nama,
            "nim": nim,
            "nilai_uts": nilai_uts,
            "nilai_uas": nilai_uas,
            "nilai_tugas": nilai_tugas,
        }
        return mahasiswa_baru
    except ValueError:
        print("\n[!] Error: Input nilai harus berupa angka. Data dibatalkan.")
        return None

def filter_mahasiswa_by_grade():
    """Fungsi untuk memfilter dan menampilkan mahasiswa berdasarkan grade."""
    grade_dicari = input("\nMasukkan Grade yang ingin dicari (A/B/C/D/E): ").upper()
    if grade_dicari not in ["A", "B", "C", "D", "E"]:
        print(f"[!] Grade '{grade_dicari}' tidak valid.")
        return

    hasil_filter = []
    for mhs in data_mahasiswa:
        nilai_akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        grade = tentukan_grade(nilai_akhir)
        if grade == grade_dicari:
            hasil_filter.append(mhs)

    print(f"\n--- Menampilkan Mahasiswa dengan Grade '{grade_dicari}' ---")
    tampilkan_data(hasil_filter)

def hitung_rata_rata_kelas():
    """Fungsi untuk menghitung nilai akhir rata-rata seluruh kelas."""
    if not data_mahasiswa:
        print("\n[!] Tidak ada data mahasiswa untuk dihitung.")
        return

    total_nilai_akhir = 0
    for mhs in data_mahasiswa:
        total_nilai_akhir += hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
    
    rata_rata = total_nilai_akhir / len(data_mahasiswa)
    print(f"\n--- Rata-rata Nilai Kelas ---")
    print(f"Total Mahasiswa : {len(data_mahasiswa)}")
    print(f"Rata-rata Kelas : {rata_rata:.2f}")

# --- FUNGSI UTAMA (MAIN MENU) ---

def main():
    """Fungsi utama untuk menjalankan program."""
    while True:
        print("\n" + "=" * 40)
        print(f"{'Program Pengelolaan Data Nilai':^40}")
        print("=" * 40)
        print("Menu:")
        print("1. Tampilkan Semua Data Mahasiswa")
        print("2. Input Data Mahasiswa Baru")
        print("3. Cari Nilai Tertinggi & Terendah")
        print("4. Filter Mahasiswa Berdasarkan Grade")
        print("5. Hitung Rata-rata Nilai Kelas")
        print("0. Keluar")
        print("-" * 40)
        
        pilihan = input("Pilih menu (0-5): ")

        if pilihan == '1':
            tampilkan_data(data_mahasiswa)
        
        elif pilihan == '2':
            data_baru = input_data_mahasiswa_baru()
            if data_baru: # Jika data_baru bukan None (berhasil diinput)
                data_mahasiswa.append(data_baru)
                print(f"\n[+] Data '{data_baru['nama']}' berhasil ditambahkan.")
                tampilkan_data(data_mahasiswa) # Langsung tampilkan data terbaru
        
        elif pilihan == '3':
            cari_mahasiswa_tertinggi_terendah(data_mahasiswa)
        
        elif pilihan == '4':
            filter_mahasiswa_by_grade()
        
        elif pilihan == '5':
            hitung_rata_rata_kelas()
        
        elif pilihan == '0':
            print("\nTerima kasih telah menggunakan program ini. Sampai jumpa!")
            break
        
        else:
            print(f"\n[!] Pilihan '{pilihan}' tidak valid. Silakan coba lagi.")
# Memastikan program hanya berjalan jika file ini dieksekusi secara langsung
if __name__ == "__main__":
    main()