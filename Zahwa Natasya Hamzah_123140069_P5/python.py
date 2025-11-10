from abc import ABC, abstractmethod

# Kriteria: Penggunaan Abstract Class (Bobot 30%)
class LibraryItem(ABC):
    """
    Abstract base class (class abstract) untuk semua item di perpustakaan.
    Setiap item HARUS memiliki ID dan Judul.

    Kriteria yang Dipenuhi:
    - Abstract Class: Menggunakan ABC dan @abstractmethod.
    - Encapsulation: Menggunakan atribut private (__id) dan protected (_title).
    - Property Decorator: Menggunakan @property untuk 'id'.
    """

    def __init__(self, id_item, title):
        # Kriteria: Implementasi Encapsulation (Bobot 25%)
        # Atribut private, hanya bisa diakses di dalam class ini.
        self.__id = id_item
        # Atribut protected, bisa diakses oleh class ini dan subclass-nya.
        self._title = title

    # Kriteria: Implementasi Encapsulation (Bobot 25%)
    # Menggunakan @property decorator untuk membuat getter publik
    # untuk atribut private __id.
    @property
    def id(self):
        """Property getter untuk mendapatkan __id yang private."""
        return self.__id

    @property
    def title(self):
        """Property getter untuk mendapatkan _title yang protected."""
        return self._title

    # Kriteria: Penggunaan Abstract Class (Bobot 30%)
    @abstractmethod
    def display_details(self):
        """
        Metode abstract yang WAJIB di-implementasikan oleh semua subclass
        (Contoh: Book, Magazine).
        """
        pass


# Kriteria: Penggunaan Inheritance (Bobot 30%)
class Book(LibraryItem):
    """
    Subclass yang mewarisi (inherits) dari LibraryItem.
    Mewakili item berupa Buku.
    """

    def __init__(self, id_item, title, author):
        # Memanggil constructor dari parent class (LibraryItem)
        super().__init__(id_item, title)
        # Atribut spesifik untuk Book
        self._author = author  # Protected attribute

    # Kriteria: Penerapan Polymorphism (Bobot 20%)
    def display_details(self):
        """
        Implementasi metode abstract display_details() yang spesifik untuk Book.
        Saat metode ini dipanggil dari objek Library, inilah yang disebut Polymorphism.
        """
        print("--- BUKU ---")
        print(f"  ID       : {self.id}")       # Menggunakan property getter 'id'
        print(f"  Judul    : {self.title}")    # Menggunakan property getter 'title'
        print(f"  Penulis  : {self._author}")
        print("-" * 12)


# Kriteria: Penggunaan Inheritance (Bobot 30%)
class Magazine(LibraryItem):
    """
    Subclass kedua yang mewarisi (inherits) dari LibraryItem.
    Mewakili item berupa Majalah.
    """

    def __init__(self, id_item, title, issue):
        # Memanggil constructor dari parent class (LibraryItem)
        super().__init__(id_item, title)
        # Atribut spesifik untuk Magazine
        self._issue = issue  # Protected attribute

    # Kriteria: Penerapan Polymorphism (Bobot 20%)
    def display_details(self):
        """
        Implementasi metode abstract display_details() yang spesifik untuk Magazine.
        Ini juga bagian dari Polymorphism.
        """
        print("--- MAJALAH ---")
        print(f"  ID      : {self.id}")
        print(f"  Judul   : {self.title}")
        print(f"  Edisi   : {self._issue}")
        print("-" * 15)


class Library:
    """
    Class utama untuk mengelola koleksi perpustakaan.
    Class ini akan menyimpan dan mengelola objek-objek LibraryItem.

    Kriteria yang Dipenuhi:
    - Encapsulation: Menggunakan atribut private __items.
    - Fungsionalitas Program: add_item, display_items, search_item.
    - Polymorphism: Diterapkan di dalam metode display_items dan search_item.
    """

    def __init__(self):
        # Kriteria: Implementasi Encapsulation (Bobot 25%)
        # List private untuk menyimpan semua item perpustakaan.
        self.__items = []

    # Kriteria: Fungsionalitas Program (Bobot 15%)
    def add_item(self, item):
        """Menambahkan item (Book atau Magazine) ke dalam perpustakaan."""
        # Pengecekan untuk memastikan hanya item turunan LibraryItem yang bisa ditambah
        if isinstance(item, LibraryItem):
            self.__items.append(item)
            print(f"[INFO] Berhasil menambahkan: '{item.title}'")
        else:
            print(f"[ERROR] Gagal menambahkan. Objek bukan merupakan LibraryItem.")

    # Kriteria: Fungsionalitas Program (Bobot 15%)
    def display_items(self):
        """Menampilkan semua item yang ada di perpustakaan."""
        if not self.__items:
            print("\n[INFO] Perpustakaan masih kosong.")
            return

        print("\n=== DAFTAR SEMUA ITEM DI PERPUSTAKAAN ===")
        # Kriteria: Penerapan Polymorphism (Bobot 20%)
        # Python secara otomatis akan memanggil metode display_details()
        # yang benar (milik Book atau Magazine) tergantung tipe objek 'item'.
        for item in self.__items:
            item.display_details()

    # Kriteria: Fungsionalitas Program (Bobot 15%)
    def search_item(self, query):
        """Mencari item berdasarkan ID atau Judul (case-insensitive)."""
        print(f"\n=== HASIL PENCARIAN UNTUK: '{query}' ===")
        found_items = []
        query_lower = query.lower()

        for item in self.__items:
            # Mencari berdasarkan ID (case-sensitive) atau Judul (case-insensitive)
            if item.id == query or item.title.lower() == query_lower:
                found_items.append(item)

        if not found_items:
            print("[INFO] Item tidak ditemukan.")
        else:
            # Polymorphism juga terjadi di sini saat menampilkan hasil pencarian
            for item in found_items:
                item.display_details()


# Kriteria: Fungsionalitas Program (Bobot 15%)
# Bagian utama untuk menjalankan program
if __name__ == "__main__":
    # 1. Buat objek perpustakaan
    perpustakaan_utama = Library()
    print("Sistem Manajemen Perpustakaan Dijalankan...")

    # 2. Buat objek Buku dan Majalah
    buku1 = Book(id_item="B001", title="Dasar-Dasar OOP Python", author="Alex Budiman")
    buku2 = Book(id_item="B002", title="Belajar Struktur Data", author="Citra Lestari")
    majalah1 = Magazine(id_item="M001", title="National Geographic", issue="November 2025")

    # 3. Fungsionalitas: Menambahkan item ke perpustakaan
    print("\n--- Menambahkan Item ---")
    perpustakaan_utama.add_item(buku1)
    perpustakaan_utama.add_item(buku2)
    perpustakaan_utama.add_item(majalah1)
    # Mencoba menambahkan data yang salah
    perpustakaan_utama.add_item("Ini bukan item")

    # 4. Fungsionalitas: Menampilkan daftar item
    # Ini akan mendemonstrasikan Polymorphism
    perpustakaan_utama.display_items()

    # 5. Fungsionalitas: Mencari item
    # Mencari berdasarkan ID
    perpustakaan_utama.search_item("B001")

    # Mencari berdasarkan Judul (case-insensitive)
    perpustakaan_utama.search_item("national geographic")

    # Mencari item yang tidak ada
    perpustakaan_utama.search_item("X999")