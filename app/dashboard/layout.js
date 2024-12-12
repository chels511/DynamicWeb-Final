"use client";
import Link from "next/link";
import styles from "../header.module.css";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.dashboardLayout}>
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>Sideshow Showcase</h1>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/dashboard">Home</Link>
          </li>
          <li>
            <Link href="/dashboard/create-post">Create Post</Link>
          </li>
          <li>
            <Link href="/dashboard/profile">User Profile</Link>
          </li>
          <li>
            <Link href="/">Logout</Link>
          </li>
        </ul>
      </nav>

      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
