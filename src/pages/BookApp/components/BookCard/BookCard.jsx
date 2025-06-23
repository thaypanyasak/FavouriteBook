import React, { useState, useMemo } from "react";
import styles from "../BookCard/styles/BookCard.module.css";

export default function BookCard({
  id,
  title,
  author,
  genre,
  year,
  isRead,
  onToggleRead,
  onDelete,
  onEdit,
  isNew,
  darkMode,
}) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleDelete = () => {
    setIsRemoving(true);
    setTimeout(() => onDelete(id), 800);
  };

  const tooltips = [
    "Thay đẹp trai quá đáng!",
    "Thay đẹp như mơ 🌈",
    "Thay đẹp mà còn giỏi nữa!",
    "Thay đẹp đến mức không cần filter",
    "Thay đẹp hơn cả nhân vật chính 😎",
    "Thay đẹp theo phong cách retro 🕶️",
    "Thay đẹp chill như nhạc Lofi",
    "Thay đẹp như AI vẽ 😍",
    "Thay đẹp chuẩn gu Gen Z",
    "Thay đẹp mà không cần cố gắng 🫶",
    "Thay đẹp như trời Tây nhưng tâm hồn Việt",
    "Thay đẹp mà HTML còn không định nghĩa nổi",
    "Thay đẹp khiến CSS cũng phải đổ bóng",
  ];

  const randomTooltip = useMemo(() => {
    const index = Math.floor(Math.random() * tooltips.length);
    return tooltips[index];
  }, []);

  return (
    <div
      className={`${styles.card} 
    ${isRead ? styles.read : ""} 
    ${isRemoving ? styles.slideOut : ""} 
    ${isNew ? styles.newCard : ""} 
    ${darkMode ? styles.cardDark : ""}
  `}
    >
      <h2 className={styles.titleTooltip}>
        <span className={styles.tooltipText} data-tooltip={randomTooltip}>
          {title}
        </span>
      </h2>

      <div className={styles.spacebar}></div>

      <div className={styles.details}>
        <p>Author: {author}</p>
        <p>Genre: {genre}</p>
        <p>Year: {year}</p>
      </div>

      <div className={styles.footerRow}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={isRead}
            onChange={() => onToggleRead(id)}
          />
          Read
        </label>

        <div className={styles.actions}>
          <button className={styles.editBtn} onClick={() => onEdit?.(id)}>
            Edit
          </button>
          <button className={styles.deleteBtn} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
