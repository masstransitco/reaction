// src/index.js

import React from "react";

import ReactDOM from "react-dom/client";

import App from "./App";

import { AppProvider } from "./context/AppContext";

import "./styles/globals.css"; from './dummy';
 from './dummy';
import "./App.css"; from './dummy';
 from './dummy';
import ErrorBoundary from "./components/ErrorBoundary";


// Import ArcGIS CSS
import "@arcgis/core/assets/esri/themes/light/main.css"; from './dummy';
 from './dummy';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
