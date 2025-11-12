import React, { useState, useEffect } from 'react';

const BookFormModal = ({ book, onClose, onSave }) => {
  const [form, setForm] = useState({ title: '', author: '', category: '', price: '', published: false });

  useEffect(() => {
    if (book) setForm({ ...book });
    else setForm({ title: '', author: '', category: '', price: '', published: false });
  }, [book]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      alert('Title and author are required');
      return;
    }
    // ensure price stored as string as backend expects String
    onSave(form);
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{book ? 'Edit Book' : 'Add Book'}</h2>
          <button className="close" onClick={onClose}>✖</button>
        </div>
        <form onSubmit={submit} className="modal-form">
          <label>
            Title
            <input name="title" value={form.title} onChange={handleChange} />
          </label>
          <label>
            Author
            <input name="author" value={form.author} onChange={handleChange} />
          </label>
          <label>
            Category
            <input name="category" value={form.category} onChange={handleChange} />
          </label>
          <label>
            Price
            <input name="price" value={form.price} onChange={handleChange} />
          </label>
          <label className="row">
            <input name="published" type="checkbox" checked={form.published} onChange={handleChange} />
            <span>Published</span>
          </label>
          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">{book ? 'Update' : 'Save'}</button>
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;
