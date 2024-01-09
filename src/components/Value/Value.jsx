import React from "react";
import styles from "./value.module.css";

export const Value = ({ value, onChange }) => {
  function clearOptions(optionToRemove) {
    const updatedValue = value.filter((v) => v !== optionToRemove);
    onChange(updatedValue);
  }

  return (
    <>
      {Array.isArray(value) &&
        value.map((v) => (
          <div className={styles["value-box"]} key={v.slug}>
            <span className={styles.value}>{v.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearOptions(v);
              }}
              className={styles["clear-btn"]}
            >
              &times;
            </button>
          </div>
        ))}
    </>
  );
};
