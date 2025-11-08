import { useMemo } from 'react';
import { useBooks } from '../context/BookContext'; // Import context

// Hook ini berfungsi untuk menghitung statistik buku
function useBookStats() {
  const { books } = useBooks(); // Ambil daftar buku dari context

  // Gunakan useMemo agar kalkulasi tidak diulang jika 'books' tidak berubah
  const stats = useMemo(() => {
    const total = books.length;
    const owned = books.filter(book => book.status === 'milik').length;
    const reading = books.filter(book => book.status === 'baca').length;
    const toBuy = books.filter(book => book.status === 'beli').length;

    return { total, owned, reading, toBuy };
  }, [books]);

  return stats;
}

export default useBookStats;