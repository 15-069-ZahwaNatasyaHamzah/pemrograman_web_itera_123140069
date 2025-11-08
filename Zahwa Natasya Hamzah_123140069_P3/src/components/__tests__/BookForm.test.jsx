import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookForm from '../BookForm';
// 1. Impor BookContext asli (pastikan path ini benar)
import { BookContext } from '../../context/BookContext.jsx'; 

// 2. Kita HAPUS blok vi.mock(...) dari sini

// Siapkan fungsi mock
const mockAddBook = vi.fn();
const mockUpdateBook = vi.fn();

// Wrapper ini sekarang akan berfungsi
const renderWithContext = (ui) => {
  return render(
    <BookContext.Provider value={{ addBook: mockAddBook, updateBook: mockUpdateBook }}>
      {ui}
    </BookContext.Provider>
  );
};

describe('BookForm Component', () => {
  // Test 1: Cek apakah form render
  it('seharusnya me-render field input form', () => {
    renderWithContext(<BookForm />);
    expect(screen.getByLabelText(/Judul Buku/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Penulis/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Simpan Buku/i })).toBeInTheDocument();
  });

  // Test 2: Cek error handling
  it('seharusnya menampilkan error jika judul atau penulis kosong', async () => {
    renderWithContext(<BookForm />);
    fireEvent.click(screen.getByRole('button', { name: /Simpan Buku/i }));

    expect(await screen.findByText('Judul tidak boleh kosong')).toBeInTheDocument();
    expect(await screen.findByText('Penulis tidak boleh kosong')).toBeInTheDocument();
    expect(mockAddBook).not.toHaveBeenCalled();
  });

  // Test 3: Cek submit
  it('seharusnya memanggil addBook saat form valid', async () => {
    renderWithContext(<BookForm />);
    
    fireEvent.input(screen.getByLabelText(/Judul Buku/i), { target: { value: 'Buku Tes' } });
    fireEvent.input(screen.getByLabelText(/Penulis/i), { target: { value: 'Penulis Tes' } });
    fireEvent.click(screen.getByRole('button', { name: /Simpan Buku/i }));

    expect(mockAddBook).toHaveBeenCalledWith({
      title: 'Buku Tes',
      author: 'Penulis Tes',
      status: 'milik'
    });
  });
});