import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import styles from "../SearchBar/styles/SearchBar.module.css";

export default function SearchBar({ onSearch, hasResult }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showIcon, setShowIcon] = useState(null);

  useEffect(() => {
    if (query.trim() === "") {
      setLoading(false);
      setShowIcon(null);
      onSearch("");
      return;
    }

    setLoading(true);
    setShowIcon(null);

    const timeout = setTimeout(() => {
      const result = onSearch(query);
      setLoading(false);
      setShowIcon(result ? "check" : "error");
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, onSearch]);

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books..."
          className={styles.input}
        />
        <div className={styles.statusIcon}>
          {loading && <ImSpinner2 className={styles.spinner} />}
          {!loading && showIcon === "check" && (
            <FaCheckCircle className={styles.check} />
          )}
          {!loading && showIcon === "error" && (
            <FaTimesCircle className={styles.error} />
          )}
        </div>
      </div>
    </div>
  );
}
