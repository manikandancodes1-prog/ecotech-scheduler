import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";

/**
 * Login Component
 * Handles user authentication and session management.
 */
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  /**
   * Submits the credentials to the backend for verification.
   * On success, stores JWT and user details in localStorage.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);
      
      // Store authentication data for persistent session
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      alert("Login Successful! Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (err) {
      // Clear error handling for failed authentication
      alert("Authentication Failed: Please check your email or password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl transition-all hover:shadow-blue-500/20">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">EcoTech Scheduler</h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">Manage your professional schedule efficiently</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
              <input
                type="email"
                placeholder="example@mail.com"
                className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white shadow-lg hover:bg-blue-700 active:scale-95 transition-all transform"
          >
            Sign In
          </button>
        </form>

        {/* Navigation to Registration */}
        <div className="mt-6 border-t border-gray-100 pt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-bold hover:underline transition-all">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;