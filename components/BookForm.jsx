"use client"

import { useState, useEffect } from "react"

export default function BookForm({ onAddBook, editingBook, onCancelEdit }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Fiction",
    price: "",
  })

  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook)
    } else {
      setFormData({
        title: "",
        author: "",
        category: "Fiction",
        price: "",
      })
    }
  }, [editingBook])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.author.trim() || !formData.price.trim()) {
      alert("Please fill in all fields")
      return
    }

    onAddBook({
      ...formData,
      price: Number.parseFloat(formData.price),
    })

    setFormData({
      title: "",
      author: "",
      category: "Fiction",
      price: "",
    })
  }

  const handleCancel = () => {
    setFormData({
      title: "",
      author: "",
      category: "Fiction",
      price: "",
    })
    onCancelEdit()
  }

  return (
    <div className="book-form">
      <h2>{editingBook ? "✏️ Edit Book" : "➕ Add New Book"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange}>
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Science</option>
            <option>History</option>
            <option>Biography</option>
            <option>Self-Help</option>
            <option>Mystery</option>
            <option>Fantasy</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingBook ? "Update Book" : "Add Book"}
          </button>
          {editingBook && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
