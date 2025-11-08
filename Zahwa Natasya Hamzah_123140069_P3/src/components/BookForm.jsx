import React, { useState, useEffect } from 'react';
import { useBooks } from "../context/BookContext.jsx";

function BookForm({ bookToEdit, onCancelEdit }) {
  const { addBook, updateBook } = useBooks();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('milik');
  const [errors, setErrors] = useState({});

  // useEffect untuk mengisi form saat mode edit
  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setStatus(bookToEdit.status);
    } else {
      resetForm();
    }
  }, [bookToEdit]);

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setStatus('milik');
    setErrors({});
  };

  // Error Handling
  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Judul tidak boleh kosong';
    if (!author.trim()) newErrors.author = 'Penulis tidak boleh kosong';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const bookData = { title, author, status };

    if (bookToEdit) {
      updateBook(bookToEdit.id, bookData);
      onCancelEdit();
    } else {
      addBook(bookData);
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div className="form-group">
        <label htmlFor="title">Judul Buku</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={errors.title ? "true" : "false"}
        />
        {errors.title && <span className="form-error" role="alert">{errors.title}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          aria-invalid={errors.author ? "true" : "false"}
        />
        {errors.author && <span className="form-error" role="alert">{errors.author}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <div>
        <button type="submit" className="btn btn-primary">
          {bookToEdit ? 'Update Buku' : 'Simpan Buku'}
        </button>
        {bookToEdit && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancelEdit}
            style={{ marginLeft: '10px' }}
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;