"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";
import { FaRegMoon } from "react-icons/fa";
import ThemeToggle from "../pages/BookApp/components/ThemeToggle/ThemeToggle";

export default function Header({ toggleTheme }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
  }, [dark]);

  return (
    <div className="header">
      <div className={styles.container}>
        <div className={styles.logo}>
          <img
            src="./assets/img/Logo-VietProDev.png"
            style={{ width: 70, height: 50 }}
            alt="Logo"
          />
          <div className={styles.companyInfo}>
            <h1>VietDevPro</h1>
            <p>Book Management System</p>
          </div>
        </div>
        <nav className={styles.content}>
          <div className={styles.navMeny}>
            <a href="#" className={styles.navLink}>
              Dashboard
            </a>
            <a href="#" className={styles.navLink}>
              Library
            </a>
            <a href="#" className={styles.navLink}>
              Statistics
            </a>
          </div>
        </nav>

        <ThemeToggle />
      </div>
    </div>
  );
}
