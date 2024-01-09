# Automations Dashboard

## Overview

This React application serves as a dashboard for managing one-click automations. It allows users to filter and view automation data based on various criteria such as site name, category, monitoring, and extraction.

## Features

- **Filtering by Site Name:** Users can filter the automation data based on the site name, narrowing down the results to specific sites of interest.

- **Multiselect Filtering:** The application provides a multiselect feature, enabling users to filter data based on multiple criteria simultaneously, such as site names and categories.

- **Monitoring:** Users can enable monitoring to focus on automations related to monitoring. The application intelligently filters the data based on monitoring-related keywords in titles and descriptions.

- **Data Extraction:** Another feature allows users to focus on automations related to data extraction. Similar to monitoring, the application filters the data based on extraction-related keywords.

- **See All Button:** Users can reset the filters and view all automation items with a single click on the "See All" button.

## Usage

1. Clone the repository:

   ```bash
   (https://github.com/Ramilia3110/assignment.git

   cd assignment
   npm install
   npm run dev
   ```

Data Source

The automation data is provided through a jsonData module located in the data directory. The data includes one-click automations with details such as titles, categories, sites, descriptions, etc.

# React + Vite

Dependencies:
react (version: ^18.2.0):
A JavaScript library for building user interfaces. React allows you to create reusable UI components.
react-dom (version: ^18.2.0):
Provides the entry point for working with the DOM in a React application. It renders React components into the DOM.
react-icons (version: ^4.12.0):
A library that provides a set of popular icons for use in React applications. It includes various icon sets to enhance your UI.
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# assignment
