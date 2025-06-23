"use client";

import { useState, useEffect } from "react";
import styles from "../../../../styles/Header.module.css";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove(
      theme === "light" ? "dark" : "light"
    );
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button className={styles.themeToggle} onClick={toggleTheme}>
      {theme === "light" ? (
        <MdOutlineDarkMode className={styles.icon} />
      ) : (
        <MdOutlineLightMode className={styles.icon} />
      )}
    </button>
  );
}
