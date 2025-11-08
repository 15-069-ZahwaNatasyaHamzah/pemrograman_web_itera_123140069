import React, { useState, useMemo } from 'react';
import { useBooks } from '../../context/BookContext';
import BookList from '../../components/BookList.jsx';
import BookForm from '../../components/BookForm.jsx';
import BookFilter from '../../components/BookFilter.jsx';

function Home() {
  const { books } = useBooks();
  const [editingBook, setEditingBook] = useState(null);

  // State untuk filter dan search (useState)
  const [filter, setFilter] = useState('semua');
  const [searchTerm, setSearchTerm] = useState('');

  // Logika untuk filter dan search
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const statusMatch = filter === 'semua' || book.status === filter;
      const searchMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      return statusMatch && searchMatch;
    });
  }, [books, filter, searchTerm]);

  const handleEdit = (book) => {
    setEditingBook(book);
    window.scrollTo(0, 0);
  };

  const cancelEdit = () => {
    setEditingBook(null);
  };

  return (
    <div>
      <div className="card">
        <h2>{editingBook ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
        <BookForm
          bookToEdit={editingBook}
          onCancelEdit={cancelEdit}
        />
      </div>

      <div className="card">
        <h2>Daftar Bukuku</h2>
        <BookFilter
          filter={filter}
          setFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      <BookList
        books={filteredBooks}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default Home;