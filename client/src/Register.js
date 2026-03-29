import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "./api";

/**
 * Register Component
 * Facilitates new user onboarding by capturing profile details
 * and persisting them to the database via the Auth API.
 */
const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles the registration form submission.
   * Sends user data to the backend and redirects to login upon success.
   */
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to create a new user account
      await API.post("/auth/register", formData);
      alert("Registration Successful! Redirecting to login page...");
      navigate("/login");
    } catch (err) {
      // Basic error handling for registration failures
      alert("Registration failed. This email might already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Get Started 🚀</h2>
          <p className="text-gray-500 mt-2 text-sm">Create an account to start scheduling</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm" 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              required 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm" 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              required 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Secure Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm" 
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
              required 
            />
          </div>

          <button 
            disabled={loading}
            className={`w-full text-white p-3 rounded-xl font-bold transition-all shadow-lg ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;