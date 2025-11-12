"use client"

export default function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      {searchTerm && (
        <button onClick={() => onSearchChange("")} className="clear-btn" title="Clear search">
          ✕
        </button>
      )}
    </div>
  )
}
