import React, { useState, useEffect } from "react";
import { Select } from "./../Select/Select";
import { MultiselectSearch } from "./../MultiselectSearch/MultiselectSearch";
import { Value } from "../Value/Value";
import styles from "./filter.module.css";
import { LuArrowDownUp } from "react-icons/lu";
import { PiMonitorBold } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const options1 = [
  { title: "Competitive Intelligence", slug: "competitive-intelligence" },
  { title: "SEO", slug: "seo" },
];

const Filter = ({
  options,
  onFilterChange,
  onExtract,
  onFilterChangeSingle,
  onMonitoring,
}) => {
  const [value, setValue] = useState([]);
  const [extracting, setExtracting] = useState(false);
  const [monitoring, setMonitoring] = useState(false);
  const [singleselectValue, setSingleselectValue] = useState();
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  //handle extract
  const handleExtractingChange = () => {
    setExtracting((prevValue) => !prevValue);
    onExtract(!extracting);
  };

  //handle monitoring
  const handleMontoringChange = () => {
    setMonitoring((prevValue) => !prevValue);
    onMonitoring(!monitoring);
  };

  //handle scrolling filter container

  const handleScroll = (direction) => {
    const container = document.getElementById("scrollContainer");
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollLeft += scrollAmount;
    }
  };

  useEffect(() => {
    const container = document.getElementById("scrollContainer");
    if (container) {
      setShowScrollButtons(container.scrollWidth > container.clientWidth);
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      const selectedTitles = value.map((option) => option.title);

      onFilterChange(selectedTitles);
    }
  }, [value, onFilterChange]);

  useEffect(() => {
    if (singleselectValue) {
      const selectedSingleTitle = singleselectValue.title;

      onFilterChangeSingle(selectedSingleTitle);
      console.log(selectedSingleTitle);
    }
  }, [singleselectValue, onFilterChangeSingle]);

  return (
    <div className={styles.container} id="scrollContainer">
      {showScrollButtons && (
        <button
          className={`${styles["scroll-btn"]} ${styles["left-btn"]}`}
          onClick={() => handleScroll("left")}
        >
          <FaArrowLeft />
        </button>
      )}
      <button
        className={`${styles.extracting} ${
          extracting ? styles.extractingActive : ""
        }`}
        onClick={handleExtractingChange}
      >
        <span>
          <LuArrowDownUp />
        </span>
        <span> Extract Data</span>
      </button>
      <button
        className={`${styles.extracting} ${
          monitoring ? styles.extractingActive : ""
        }`}
        onClick={handleMontoringChange}
      >
        <span>
          <PiMonitorBold />
        </span>
        <span> Monitoring</span>
      </button>

      <Value multiple value={value} onChange={(o) => setValue(o)} />
      <Select
        options={options1}
        onChange={(o) => setSingleselectValue(o)}
        value={singleselectValue}
      />
      <MultiselectSearch
        multiple
        options={options}
        value={value}
        onChange={(o) => setValue(o)}
      />
      {showScrollButtons && (
        <button
          className={`${styles["scroll-btn"]} ${styles["right-btn"]}`}
          onClick={() => handleScroll("right")}
        >
          <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default Filter;
