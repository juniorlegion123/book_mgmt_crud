"use client"

import { useState, useEffect } from "react"
import BookForm from "./components/BookForm"
import BookList from "./components/BookList"
import SearchBar from "./components/SearchBar"

export default function App() {
  const [books, setBooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [editingBook, setEditingBook] = useState(null)

  // Load books from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("books")
    if (saved) {
      setBooks(JSON.parse(saved))
    }
  }, [])

  // Save books to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books))
  }, [books])

  const addBook = (book) => {
    if (editingBook) {
      setBooks(books.map((b) => (b.id === editingBook.id ? { ...book, id: b.id } : b)))
      setEditingBook(null)
    } else {
      setBooks([...books, { ...book, id: Date.now() }])
    }
  }

  const deleteBook = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((b) => b.id !== id))
    }
  }

  const startEdit = (book) => {
    setEditingBook(book)
  }

  const cancelEdit = () => {
    setEditingBook(null)
  }

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>📚 Book Management System</h1>
          <p>Manage your library efficiently</p>
        </div>
      </header>

      <main className="main-container">
        <div className="form-section">
          <BookForm onAddBook={addBook} editingBook={editingBook} onCancelEdit={cancelEdit} />
        </div>

        <div className="list-section">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <BookList books={filteredBooks} onDelete={deleteBook} onEdit={startEdit} />
          {filteredBooks.length === 0 && (
            <div className="empty-state">
              {books.length === 0 ? "No books yet. Add one to get started!" : "No books match your search."}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
