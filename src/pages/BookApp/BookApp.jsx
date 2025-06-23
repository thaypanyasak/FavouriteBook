"use client";

import React, { useEffect, useState } from "react";
import styles from "./BookApp.module.css";
import BookCard from "./components/BookCard/BookCard";
import BookForm from "./components/BookForm/BookForm";
import SearchBar from "./components/SearchBar/SearchBar";
import BookStats from "./components/BookStats/BookStats";
import EditModal from "./components/EditModal/EditModal";

const booksData = [
  {
    id: 1,
    title: "Thay book",
    author: "Thay",
    genre: "Sci-fi",
    year: 1965,
    isRead: false,
  },
  {
    id: 2,
    title: "Hieu Book",
    author: "Hieu",
    genre: "Sci-fi",
    year: 2000,
    isRead: false,
  },
  {
    id: 3,
    title: "React for Beginners",
    author: "Dan Abramov",
    genre: "Tech",
    year: 2020,
    isRead: true,
  },
  {
    id: 4,
    title: "CSS Secrets",
    author: "Lea Verou",
    genre: "Design",
    year: 2015,
    isRead: false,
  },
  {
    id: 5,
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    genre: "Tech",
    year: 2008,
    isRead: true,
  },
  {
    id: 6,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-help",
    year: 2018,
    isRead: false,
  },
  {
    id: 7,
    title: "Zebra Code",
    author: "Nguyen Code",
    genre: "Sci-fi",
    year: 2024,
    isRead: false,
  },
];

export default function BookApp() {
  const [books, setBooks] = useState([]);
  const [sortKey, setSortKey] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [showNotice, setShowNotice] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState(null);

  /* --------------- simulate loading --------------- */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("books");
      if (saved) {
        setBooks(JSON.parse(saved));
        setShowNotice(true);
        setTimeout(() => setShowNotice(false), 3000);
      } else {
        setBooks(booksData);
      }
    } catch (err) {
      console.error("Lỗi khi đọc localStorage:", err);
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  /*  Lưu khi danh sách thay đổi*/
  useEffect(() => {
    try {
      localStorage.setItem("books", JSON.stringify(books));
    } catch (err) {
      console.error("Lỗi khi lưu localStorage:", err);
    }
  }, [books]);

  /* --------------- derived list --------------- */
  const sortedBooks = [...books]
    .filter((b) =>
      `${b.title}${b.author}`.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === "year") return a.year - b.year;
      if (sortKey === "isRead") return a.isRead - b.isRead;
      if (sortKey === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  /* --------------- handlers --------------- */
  const handleAddBook = (newBook) => {
    setIsLoading(true);
    setLoadingType("add");
    setSortKey("recent");

    setBooks((prev) => [{ ...newBook, isNew: true }, ...prev]);

    setTimeout(() => {
      setBooks((prev) =>
        prev.map((b) => (b.isNew ? { ...b, isNew: false } : b))
      );
      setIsLoading(false);
      setLoadingType(null);
    }, 1200);
  };

  const toggleRead = (id) =>
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isRead: !b.isRead } : b))
    );

  const deleteBook = (id) => {
    setIsLoading(true);
    setLoadingType("delete");
    setBooks((prev) => prev.filter((b) => b.id !== id));

    setTimeout(() => {
      setIsLoading(false);
      setLoadingType(null);
    }, 1000);
  };

  const handleEditBook = (updatedBook) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    setEditingBook(null);
  };

  /* --------------- render --------------- */
  return (
    <div className={`${styles.container} ${darkMode ? styles.themeDark : ""}`}>
      {/* CONTENT SẼ BỊ BLUR */}
      <div
        className={`${styles.mainContent} ${editingBook ? styles.blur : ""}`}
      >
        <h1 className={styles.title}>📚 Book Library</h1>

        {showNotice && (
          <div className={styles.notice}>
            📦 Đã khôi phục dữ liệu từ localStorage
          </div>
        )}

        <SearchBar
          onSearch={(query) => {
            setSearchQuery(query);
            const matched = books.filter((b) =>
              `${b.title}${b.author}`
                .toLowerCase()
                .includes(query.toLowerCase())
            );
            return matched.length > 0;
          }}
        />

        <div className={styles.centerItem}>
          <select
            className={styles.select}
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="recent">Sort by Recent</option>
            <option value="title">Sort by Title</option>
            <option value="year">Sort by Year</option>
            <option value="isRead">Sort by Status</option>
          </select>
        </div>

        <BookForm onAddBook={handleAddBook} />
        <BookStats books={books} />

        <div className={styles.centerItem}>
          <button
            className={styles.resetButton}
            onClick={() => {
              localStorage.removeItem("books");
              setBooks(booksData);
              setSortKey("recent");
            }}
          >
            🔁 Reset Data
          </button>
        </div>

        {books.length === 0 ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className={styles.skeleton}></div>
          ))
        ) : (
          <div className={styles.grid}>
            {sortedBooks.map((book) => (
              <BookCard
                key={book.id}
                {...book}
                isNew={book.isNew}
                isDark={darkMode}
                onToggleRead={toggleRead}
                onDelete={deleteBook}
                onEdit={() => setEditingBook(book)}
              />
            ))}
          </div>
        )}

        {isLoading && (
          <div className={styles.loadingWrapper}>
            <div
              className={`${styles.loadingProgress} ${
                loadingType === "add" ? styles.add : styles.remove
              }`}
            />
          </div>
        )}
      </div>

      {/* MODAL TÁCH RA NGOÀI ĐỂ KHÔNG BỊ BLUR */}
      {editingBook && (
        <EditModal
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSave={handleEditBook}
        />
      )}
    </div>
  );
}
