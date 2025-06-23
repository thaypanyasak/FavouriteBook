import React, { useState, useEffect } from "react";
import styles from "../EditModal/styles/EditModal.module.css";

export default function EditModal({ book, onClose, onSave }) {
  const [form, setForm] = useState({ ...book });

  useEffect(() => {
    setForm({ ...book });
  }, [book]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Edit Book</h2>
          <button className={styles.close} onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Title</label>
            <input
              className={styles.input}
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
            />
          </div>
          <div className={styles.field}>
            <label>Author</label>
            <input
              className={styles.input}
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Author"
            />
          </div>
          <div className={styles.field}>
            <label>Genre</label>
            <input
              className={styles.input}
              name="genre"
              value={form.genre}
              onChange={handleChange}
              placeholder="Genre"
            />
          </div>
          <div className={styles.field}>
            <label>Year</label>
            <input
              className={styles.input}
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="Year"
              type="number"
            />
          </div>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="isRead"
              checked={form.isRead || false}
              onChange={handleChange}
            />
            Mark as Read
          </label>
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.button} ${styles.cancel}`}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.button}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
