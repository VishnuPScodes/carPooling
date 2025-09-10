import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/home.module.css";

function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.head}>Car pooling</div>
      <Link to="/login" id={styles.red} className={styles.button}>
        Register for car pooling
      </Link>
      <Link to="/register" id={styles.green} className={styles.button}>
        Check available pooling
      </Link>
    </div>
  );
}

export default HomePage;
