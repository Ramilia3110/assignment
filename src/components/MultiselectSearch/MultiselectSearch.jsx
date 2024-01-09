import React, { useState, useEffect } from "react";
import styles from "./multiselect.module.css";

export function MultiselectSearch({ multiple, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option) {
    setSelectedOption(option);
    setSearchTerm("");
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function isOptionSelected(option) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen && highlightedIndex !== 0) {
      setHighlightedIndex(0);
    }
  }, [isOpen, highlightedIndex]);

  useEffect(() => {
    setFilteredOptions((prevOptions) =>
      prevOptions.filter((option) =>
        option.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div
      className={styles.select}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className={styles.caret}>
        <span>+</span>
        <p>Filter by Site</p>
      </div>

      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        <input
          type="text"
          placeholder={selectedOption ? "" : "Search..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className={styles.search}
        />
        {filteredOptions.length === 0 ? (
          <li className={styles.noResults}>No results found</li>
        ) : (
          filteredOptions.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsOpen(false);
              }}
              key={option.slug}
              className={`${styles.option} ${
                isOptionSelected(option) ? styles.selected : ""
              } ${index === highlightedIndex ? styles.highlighted : ""}`}
            >
              {option.title}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
