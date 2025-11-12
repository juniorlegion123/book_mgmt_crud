"use client"

import type { Book } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Pencil } from "lucide-react"

interface BookListProps {
  books: Book[]
  onEdit: (book: Book) => void
  onDelete: (id: string) => void
}

export default function BookList({ books, onEdit, onDelete }: BookListProps) {
  if (books.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <p className="text-muted-foreground text-lg">No books found</p>
            <p className="text-muted-foreground text-sm mt-2">Add a new book to get started</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {books.map((book) => (
        <Card key={book.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{book.title}</h3>
                <p className="text-sm text-muted-foreground">by {book.author}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                    {book.category}
                  </span>
                  <span className="inline-block text-green-600 dark:text-green-400 font-semibold text-sm">
                    ${book.price.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <Button variant="outline" size="sm" onClick={() => onEdit(book)} className="h-8 w-8 p-0">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    if (confirm(`Delete "${book.title}"?`)) {
                      onDelete(book.id)
                    }
                  }}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
