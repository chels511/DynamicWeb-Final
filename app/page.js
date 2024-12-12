"use client";
import { useState } from "react";
import styles from "./page.module.css";
import LoginForm from "./components/Loginform";
import CreateUserForm from "./components/createform";

export default function Header() {
  const [activeForm, setActiveForm] = useState(null);

  const handleShowForm = (form) => {
    setActiveForm(form);
  };

  return (
    <div className={styles.splitContainer}>
      <div className={styles.leftSide}>
        <h1>Sideshow Showcase</h1>
        <p>Celebrating Pop Culture’s Finest, Together.</p>
      </div>

      <div className={styles.rightSide}>
        <header className={styles.header}>
          <div>
            <h2>Begin Your Showcase</h2>
          </div>
          <nav>
            <ul className={styles.navList}>
              {!activeForm && (
                <>
                  <li className={styles.navListItem}>
                    <button
                      onClick={() => handleShowForm("login")}
                      className={styles.actionButton}
                    >
                      Login
                    </button>
                  </li>
                  <li className={styles.navListItem}>
                    <button
                      onClick={() => handleShowForm("create")}
                      className={styles.actionButton}
                    >
                      Create User
                    </button>
                  </li>
                </>
              )}

              {activeForm === "login" && (
                <li className={styles.navListItem}>
                  <LoginForm />
                  <button
                    onClick={() => setActiveForm(null)}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </li>
              )}
              {activeForm === "create" && (
                <li className={styles.navListItem}>
                  <CreateUserForm />
                  <button
                    onClick={() => setActiveForm(null)}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
}
