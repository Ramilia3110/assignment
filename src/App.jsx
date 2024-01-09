import "./App.css";
import { useState } from "react";
import Filter from "./components/Filters/Filter";
import Card from "./components/Card/Card";
import { jsonData } from "./data/automations";

function App() {
  const items = jsonData.data.oneClickAutomations.items;
  const [showAllItems, setShowAllItems] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [extracting, setExtracting] = useState(false);
  const [extracted, setExtracted] = useState([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [monitoring, setMonitoring] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  //Options for Filter by Site
  const objectsArray = [...new Set(items.map((item) => item.sites[0].title))];
  const options = objectsArray.map((word) => ({
    title: word,
    slug: word.toLowerCase(),
  }));

  //Monitoring filter
  const handleMonitoring = (isChecked) => {
    setIsMonitoring((prevIsMonitoring) => {
      const newIsMonitoring = !prevIsMonitoring;
      handleMonitoringFilter(newIsMonitoring);
      return newIsMonitoring;
    });
  };

  function handleMonitoringFilter(newIsMonitoring) {
    let updatedFilteredItems = [];

    if (newIsMonitoring) {
      const lowercaseKeyword = "monitor".toLowerCase();
      updatedFilteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(lowercaseKeyword)
      );
    } else {
      updatedFilteredItems = showAllItems ? items : [];
    }

    setIsFiltered(updatedFilteredItems.length > 0);
    setFilteredItems(updatedFilteredItems);
    setMonitoring(updatedFilteredItems);
    console.log(updatedFilteredItems);
  }

  //Extracting filter
  const handleExtracting = (isChecked) => {
    setExtracting(isChecked);
    handleExtractingFilter();
  };

  function handleExtractingFilter() {
    if (extracting) {
      const extractedData = filteredItems.filter((item) => {
        return item.title.toLowerCase().includes("extract");
      });

      setFilteredItems(extractedData);
    } else {
      const extractedItems = items.filter((item) => {
        return item.title.toLowerCase().includes("extract");
      });
      setExtracted(extractedItems);

      setFilteredItems(showAllItems ? items : []);
    }
  }

  //Single select
  const handleSingleFilterChange = (selectedSingleTitle) => {
    let filteredData = [];

    if (selectedSingleTitle) {
      const itemsToFilter = filteredItems.length > 0 ? filteredItems : items;

      filteredData = itemsToFilter.filter((item) => {
        return item.categories.some((category) => {
          return category.title.includes(selectedSingleTitle);
        });
      });
    }

    setIsFiltered(filteredData.length > 0);
    setFilteredItems(filteredData);
  };

  //Multiselect filter function
  const handleFilterChange = (selectedTitles) => {
    if (!selectedTitles || selectedTitles.length === 0) {
      setIsFiltered(false);
      setFilteredItems(showAllItems ? items : []);
      return;
    }

    const lowerCaseSelectedTitles = selectedTitles.map((title) =>
      title.toLowerCase()
    );

    // Filter items based on selected titles
    const filteredData = items.filter(({ title, sites }) => {
      const lowerCaseTitle = title.toLowerCase();
      const siteTitles = sites.map((site) => site.title.toLowerCase());

      return lowerCaseSelectedTitles.some(
        (selectedTitle) =>
          lowerCaseTitle.includes(selectedTitle) ||
          siteTitles.some((siteTitle) => siteTitle.includes(selectedTitle))
      );
    });

    setIsFiltered(true);
    setShowAllItems(false);
    setFilteredItems(filteredData);
  };

  const handleClickSeeAll = () => {
    setShowAllItems(true);

    // Check if the items are currently filtered
    if (isFiltered) {
      setIsFiltered(false);
      setFilteredItems([]);
    }

    // Reset other states to their initial values
    setExtracting(false);
    setExtracted([]);
    setIsMonitoring(false);
    setMonitoring([]);
  };

  return (
    <div className="App">
      <button className="see-all" onClick={handleClickSeeAll}>
        See All
      </button>
      <div className="app-container">
        <div className="filter-box">
          <Filter
            options={options}
            onFilterChange={handleFilterChange}
            onFilterChangeSingle={handleSingleFilterChange}
            onExtract={handleExtracting}
            onMonitoring={handleMonitoring}
          />
        </div>

        <div className="container">
          <Card
            className="card"
            items={(() => {
              switch (true) {
                case extracting:
                  return extracted;
                case showAllItems:
                  return items;
                case isMonitoring:
                  return monitoring;
                case isFiltered:
                  return filteredItems;
                default:
                  return items;
              }
            })()}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
