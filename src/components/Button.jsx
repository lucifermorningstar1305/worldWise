import React from "react";
import styles from "./Button.module.css";

const Button = ({ onClick, type, children }) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
};

export default Button;
