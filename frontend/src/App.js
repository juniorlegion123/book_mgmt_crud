import React, { useEffect, useState } from 'react';
import api from './api';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import BookFormModal from './components/BookFormModal';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [publishedOnly, setPublishedOnly] = useState(false);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/books');

      console.log(res.data);

      setBooks(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch books. Ensure backend is running at http://localhost:8080');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = async (q) => {
    setQuery(q);
    if (!q.trim()) {
      fetchBooks();
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8080/api/books/search?title=${encodeURIComponent(q)}`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      alert('Search failed');
    }
  };

  const handleFilterPublished = async (val) => {
    setPublishedOnly(val);
    if (val) {
      try {
        const res = await axios.get('http://localhost:8080/api/books/published');
        setBooks(res.data);
      } catch (err) {
        console.error(err);
        alert('Filter failed');
      }
    } else {
      fetchBooks();
    }
  };

  const openAddModal = () => {
    setEditingBook(null);
    setModalOpen(true);
  };

  const openEditModal = (book) => {
    setEditingBook(book);
    setModalOpen(true);
  };

  const handleSave = async (book) => {
    try {
      if (book.id) {
        await axios.put(`http://localhost:8080/api/books/${book.id}`, book);
      } else {
        await axios.post('http://localhost:8080/api/books', book);

        console.log(book);
      }
      setModalOpen(false);
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div className="app">
      <Header onAdd={openAddModal} />
      <main className="container">
        <div className="controls">
          <SearchBar value={query} onSearch={handleSearch} />
          <label className="published-toggle">
            <input type="checkbox" checked={publishedOnly} onChange={(e) => handleFilterPublished(e.target.checked)} />
            Published only
          </label>
        </div>
        <section className="cards">
          {books.length === 0 ? (
            <p className="empty">No books found. Add your first book!</p>
          ) : (
            books.map((b) => (
              <BookCard key={b.id} book={b} onEdit={() => openEditModal(b)} onDelete={() => handleDelete(b.id)} />
            ))
          )}
        </section>
      </main>

      {modalOpen && (
        <BookFormModal
          book={editingBook}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default App;
