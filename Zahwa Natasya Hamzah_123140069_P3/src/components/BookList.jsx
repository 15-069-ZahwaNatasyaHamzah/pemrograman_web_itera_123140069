import React, { useState } from 'react'; // Import useState
import { useBooks } from "../context/BookContext.jsx";

// Komponen Modal Konfirmasi baru
const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal-content">
        <h3>Konfirmasi Penghapusan</h3>
        <p>{message}</p>
        <div className="confirm-modal-actions">
          <button onClick={onConfirm} className="btn btn-danger">Ya, Hapus</button>
          <button onClick={onCancel} className="btn btn-secondary">Batal</button>
        </div>
      </div>
    </div>
  );
};


function BookList({ books, onEdit }) {
  const { deleteBook } = useBooks();

  // State untuk konfirmasi hapus
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDeleteId, setBookToDeleteId] = useState(null);
  const [bookToDeleteTitle, setBookToDeleteTitle] = useState('');

  // Objek untuk mapping status ke tampilan
  const statusMap = {
    milik: { text: 'Dimiliki', class: 'status-milik' },
    baca: { text: 'Sedang Dibaca', class: 'status-baca' },
    beli: { text: 'Ingin Dibeli', class: 'status-beli' },
  };

  // Fungsi untuk membuka modal konfirmasi
  const handleDeleteClick = (book) => {
    setBookToDeleteId(book.id);
    setBookToDeleteTitle(book.title);
    setIsModalOpen(true);
  };

  // Fungsi saat user mengkonfirmasi hapus
  const handleConfirmDelete = () => {
    deleteBook(bookToDeleteId);
    setIsModalOpen(false); // Tutup modal
    setBookToDeleteId(null); // Reset state
    setBookToDeleteTitle('');
  };

  // Fungsi saat user membatalkan hapus
  const handleCancelDelete = () => {
    setIsModalOpen(false); // Tutup modal
    setBookToDeleteId(null); // Reset state
    setBookToDeleteTitle('');
  };


  // Tampilkan pesan jika tidak ada buku
  if (books.length === 0) {
    return <p className="empty-list card">Tidak ada buku yang cocok dengan filter atau daftar kosong.</p>;
  }

  return (
    <>
      <div className="book-list">
        {books.map(book => (
          <div className="book-item" key={book.id}>
            <div className="book-item-details">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <span className={`status-badge ${statusMap[book.status]?.class || ''}`}>
                {statusMap[book.status]?.text || book.status}
              </span>
            </div>
            <div className="book-item-actions">
              <button
                onClick={() => onEdit(book)}
                className="btn btn-secondary"
                aria-label={`Edit ${book.title}`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(book)} // Ganti ke fungsi handle yang baru
                className="btn btn-danger"
                aria-label={`Hapus ${book.title}`}
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tampilkan modal konfirmasi */}
      <ConfirmModal
        isOpen={isModalOpen}
        message={`Apakah Anda yakin ingin menghapus buku "${bookToDeleteTitle}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}

export default BookList;