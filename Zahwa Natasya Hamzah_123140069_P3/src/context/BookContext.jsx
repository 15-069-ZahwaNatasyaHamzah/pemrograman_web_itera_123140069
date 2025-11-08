import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage'; // Import custom hook #1
import { v4 as uuidv4 } from 'uuid'; // Import uuid untuk ID unik

// 1. Buat Context (DAN EXPORT)
export const BookContext = createContext(); // <-- INI PERBAIKANNYA

// 2. Buat hook 'useBooks' agar komponen lain mudah menggunakan context
export function useBooks() {
  return useContext(BookContext);
}

// 3. Buat Provider
export function BookProvider({ children }) {
  // Gunakan custom hook 'useLocalStorage' untuk menyimpan data buku
  const [books, setBooks] = useLocalStorage('books', []);

  // Fungsi untuk menambah buku baru
  const addBook = (bookData) => {
    const newBook = { id: uuidv4(), ...bookData };
    setBooks(prevBooks => [...prevBooks, newBook]);
  };

  // Fungsi untuk mengedit buku
  const updateBook = (id, updatedBook) => {
    setBooks(prevBooks =>
      prevBooks.map(book => (book.id === id ? { ...book, ...updatedBook } : book))
    );
  };

  // Fungsi untuk menghapus buku
  const deleteBook = (id) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
  };

  // Nilai yang akan "disediakan" oleh Context
  const value = {
    books,
    addBook,
    updateBook,
    deleteBook,
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}