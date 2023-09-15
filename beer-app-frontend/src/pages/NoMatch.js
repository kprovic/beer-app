import React from "react";
import styles from "../assets/styles/NoMatch.module.css";
export function NoMatch() {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.text}>404</h1>
      <h2 className={styles.text}>NOT FOUND</h2>
    </div>
  );
}
