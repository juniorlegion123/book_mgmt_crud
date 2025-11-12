"use client"

export default function BookList({ books, onDelete, onEdit }) {
  return (
    <div className="book-list">
      <h2>Books in Library ({books.length})</h2>

      {books.length > 0 ? (
        <div className="books-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-header">
                <h3>{book.title}</h3>
                <span className="category-tag">{book.category}</span>
              </div>

              <div className="book-details">
                <p className="author">by {book.author}</p>
                <p className="price">${book.price.toFixed(2)}</p>
              </div>

              <div className="book-actions">
                <button onClick={() => onEdit(book)} className="btn btn-small btn-edit" title="Edit book">
                  ✏️ Edit
                </button>
                <button onClick={() => onDelete(book.id)} className="btn btn-small btn-delete" title="Delete book">
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-books">No books to display</div>
      )}
    </div>
  )
}
