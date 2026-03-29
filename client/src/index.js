import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 * Entry point for the React application.
 * Initializes the root element and renders the App component within StrictMode.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrapping the main App component to highlight potential problems in the application */}
    <App />
  </React.StrictMode>
);

/**
 * Performance Monitoring
 * reportWebVitals tracks real-user metrics to help measure application performance.
 * You can log results (e.g., reportWebVitals(console.log)) or send to an analytics endpoint.
 */
reportWebVitals();