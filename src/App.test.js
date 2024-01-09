// App.test.js

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers

import App from "./App";

describe("App Component", () => {
  test("Renders without crashing", () => {
    render(<App />);
  });

  // Add more test cases as needed
});
