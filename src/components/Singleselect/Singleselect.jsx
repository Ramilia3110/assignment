import React, { useState } from "react";
import styles from "./singleselect.module.css";

export function Singleselect({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  function clearOptions() {
    onChange(undefined);
  }

  function selectOption(option) {
    setFilteredOptions(options); // Reset filtered options
    setIsOpen(false);

    // Set the new option
    const newValue = option === value ? undefined : option;

    // Call onChange only if the value has changed
    if (newValue !== value) {
      onChange(newValue);
    }
  }

  function isOptionSelected(option) {
    return option === value;
  }

  return (
    <div
      className={styles.select}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className={styles.caret}>
        <span>+</span>
        <p>Filter by Categories</p>
      </div>

      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {filteredOptions.length === 0 ? (
          <li className={styles.noResults}>No results found</li>
        ) : (
          filteredOptions.map((option) => (
            <li
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
              }}
              key={option.slug}
              className={`${styles.option} ${
                isOptionSelected(option) ? styles.selected : ""
              }`}
            >
              {option.title}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
