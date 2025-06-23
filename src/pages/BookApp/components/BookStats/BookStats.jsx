import React, { useMemo } from "react";
import styles from "../BookStats/styles/BookStats.module.css";
import { BookOpen, CheckCircle, Tag } from "lucide-react";

export default function BookStats({ books = [] }) {
  const stats = useMemo(() => {
    const total = books.length;
    const readCount = books.filter((b) => b.isRead).length;

    const genreCount = books.reduce((acc, book) => {
      acc[book.genre] = (acc[book.genre] || 0) + 1;
      return acc;
    }, {});

    const mostCommonGenre =
      Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "Không rõ";

    return { total, readCount, mostCommonGenre };
  }, [books]);

  return (
    <div className={styles.statsGrid}>
      <div className={`statCard ${styles.statCard}`}>
        <BookOpen className={styles.icon} />
        <div>
          <div className={styles.value}>{stats.total}</div>
          <div className={styles.label}>Total Books</div>
        </div>
      </div>
      <div className={`statCard ${styles.statCard}`}>
        <CheckCircle className={styles.icon} />
        <div>
          <div className={styles.value}>{stats.readCount}</div>
          <div className={styles.label}>Books Read</div>
        </div>
      </div>
      <div className={`statCard ${styles.statCard}`}>
        <Tag className={styles.icon} />
        <div>
          <div className={styles.value}>{stats.mostCommonGenre}</div>
          <div className={styles.label}>Popular Genre</div>
        </div>
      </div>
    </div>
  );
}
