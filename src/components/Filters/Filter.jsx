import React, { useState, useEffect } from "react";
import { Select } from "./../Select/Select";
import { MultiselectSearch } from "./../MultiselectSearch/MultiselectSearch";
import { Value } from "../Value/Value";
import styles from "./filter.module.css";
import { LuArrowDownUp } from "react-icons/lu";
import { PiMonitorBold } from "react-icons/pi";

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

  const handleExtractingChange = () => {
    // Toggle the checkbox value and call the onExtract function
    setExtracting((prevValue) => !prevValue);
    onExtract(!extracting);
  };
  const handleMontoringChange = () => {
    // Toggle the checkbox value and call the onExtract function
    setMonitoring((prevValue) => !prevValue);
    onMonitoring(!monitoring);
  };

  useEffect(() => {
    if (value) {
      // Extract titles from selected options
      const selectedTitles = value.map((option) => option.title);
      // Pass the titles to the parent component
      onFilterChange(selectedTitles);
    }
  }, [value, onFilterChange]);

  useEffect(() => {
    if (singleselectValue) {
      // Extract titles from selected options
      const selectedSingleTitle = singleselectValue.title;
      // Pass the titles to the parent component
      onFilterChangeSingle(selectedSingleTitle);
      console.log(selectedSingleTitle);
    }
  }, [singleselectValue, onFilterChangeSingle]);

  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default Filter;
