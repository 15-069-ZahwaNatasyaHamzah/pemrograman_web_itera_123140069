import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookList from '../BookList';
// 1. Impor BookContext asli (pastikan path ini benar)
import { BookContext } from '../../context/BookContext.jsx';

// 2. Kita HAPUS blok vi.mock(...) dari sini

// Wrapper ini sekarang akan berfungsi
const renderWithContext = (ui) => {
  return render(
    <BookContext.Provider value={{ deleteBook: vi.fn() }}>
      {ui}
    </BookContext.Provider>
  );
};

describe('BookList Component', () => {
  // Test 4: Cek list kosong
  it('seharusnya menampilkan pesan jika tidak ada buku', () => {
    renderWithContext(<BookList books={[]} onEdit={vi.fn()} />);
    expect(screen.getByText(/Tidak ada buku yang cocok/i)).toBeInTheDocument();
  });
});