"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Book } from "@/app/page"

interface BookFormProps {
  book?: Book | null
  onSubmit: (book: Omit<Book, "id">) => void
  onCancel: () => void
}

export default function BookForm({ book, onSubmit, onCancel }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
  })

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        price: book.price.toString(),
      })
    } else {
      setFormData({
        title: "",
        author: "",
        category: "",
        price: "",
      })
    }
  }, [book])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.author || !formData.category || !formData.price) {
      alert("Please fill in all fields")
      return
    }

    onSubmit({
      title: formData.title,
      author: formData.author,
      category: formData.category,
      price: Number.parseFloat(formData.price),
    })

    setFormData({
      title: "",
      author: "",
      category: "",
      price: "",
    })
  }

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg">{book ? "Edit Book" : "Add New Book"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">Title</label>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">Author</label>
            <Input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">Category</label>
            <Input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Fiction, Science"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">Price ($)</label>
            <Input
              type="number"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1">
              {book ? "Update" : "Add Book"}
            </Button>
            {book && (
              <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
