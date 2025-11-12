import React from 'react';

const BookCard = ({ book, onEdit, onDelete }) => {
  return (
    <article className="card">
      <div className="card-body">
        <h3 className="card-title">{book.title}</h3>
        <p className="card-author">by {book.author || 'Unknown'}</p>
        <p className="card-meta">{book.category ? book.category + ' • ' : ''}{book.price ? '₹' + book.price : ''}</p>
        <p className="card-pub">{book.published ? 'Published' : 'Unpublished'}</p>
      </div>
      <div className="card-actions">
        <button className="btn btn-edit" onClick={onEdit} title="Edit">✏️ Edit</button>
        <button className="btn btn-danger" onClick={onDelete} title="Delete">🗑️ Delete</button>
      </div>
    </article>
  );
};

export default BookCard;
