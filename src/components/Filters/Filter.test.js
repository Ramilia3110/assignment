// Filter.test.js

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers

import Filter from "./Filter";

describe("Filter Component", () => {
  test("Renders without crashing", () => {
    render(<Filter />);
  });

  // Add more test cases as needed
});
