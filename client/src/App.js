import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register"; // Added the new Register component
import Dashboard from "./Dashboard"; 
import BookingPage from "./BookingPage";

/**
 * Main Application Component
 * Handles Client-Side Routing using React Router
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Protected Route: Dashboard for managing availability and bookings */}
          <Route path="/dashboard" element={<Dashboard />} /> 

          {/* Public Booking Route: Accessible via unique User ID for scheduling */}
          <Route path="/book/:userId" element={<BookingPage />} />

          {/* Fallback Route: Redirects any unknown paths to the Login page */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;