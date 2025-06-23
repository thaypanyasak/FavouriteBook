import React, { useState } from "react";
import styles from "../BookForm/styles/BookForm.module.css";

export default function BookForm({ onAddBook }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Tiêu đề không được để trống";
    if (!form.author.trim()) newErrors.author = "Tác giả không được để trống";
    if (!form.year || +form.year < 1900 || +form.year > 2025)
      newErrors.year = "Năm phải từ 1900 đến 2025";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) return setErrors(validation);

    onAddBook({ id: Date.now(), ...form, year: +form.year, isRead: false });
    setForm({ title: "", author: "", genre: "", year: "" });
    setErrors({});
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.grid}>
        <input
          name="title"
          placeholder="Title"
          className={styles.input}
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="author"
          placeholder="Author"
          className={styles.input}
          value={form.author}
          onChange={handleChange}
        />
        <input
          name="genre"
          placeholder="Genre"
          className={styles.input}
          value={form.genre}
          onChange={handleChange}
        />

        <input
          name="year"
          placeholder="Year"
          className={`${styles.input} ${styles.year}`}
          value={form.year}
          onChange={handleChange}
        />
        <button type="submit" className={styles.button}>
          Add Book
        </button>
      </form>

      <div className={styles.errorBox}>
        {Object.values(errors).map((msg) => (
          <p key={msg}>{msg}</p>
        ))}
      </div>
    </div>
  );
}
