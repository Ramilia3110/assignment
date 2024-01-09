import { useState, useEffect } from "react";
import styles from "./select.module.css";

export function Select({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
    }
  }, [isOpen]);

  function clearOptions() {
    onChange(undefined);
  }

  function selectOption(option) {
    if (option !== value) {
      onChange(option);
    }
  }

  function isOptionSelected(option) {
    return option === value;
  }

  return (
    <div tabIndex={0} className={styles.container}>
      {value && (
        <div className={styles["value-box"]}>
          <span className={styles.value}>{value.title}</span>
          <button
            onClick={(e) => {
              e.stopPropagation;
              clearOptions();
            }}
            className={styles["clear-btn"]}
          >
            &times;
          </button>
        </div>
      )}
      <div onClick={() => setIsOpen((prev) => !prev)} className={styles.select}>
        <div className={styles.caret}>
          <span>+</span>
          <p>Filter by Categories</p>
        </div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {options.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option?.slug} // Add conditional chaining here
              className={`${styles.option} ${
                isOptionSelected(option) ? styles.selected : ""
              } ${index === highlightedIndex ? styles.highlighted : ""}`}
            >
              {option?.title} {/* Add conditional chaining here */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
