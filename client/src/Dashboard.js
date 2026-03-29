import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

/**
 * Dashboard Component
 * The primary administrative interface for users to manage their scheduling availability
 * and view upcoming client appointments.
 */
const Dashboard = () => {
  const navigate = useNavigate();
  
  // State for managing availability settings
  const [availability, setAvailability] = useState({
    day: "Monday",
    startTime: "09:00",
    endTime: "17:00",
  });

  // State for storing appointment data fetched from the database
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Retrieve user session data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id || user?._id;
  
  // Construct the unique public booking URL for the user
  const bookingLink = `${window.location.origin}/book/${userId}`;

  /**
   * Side effect to fetch all bookings associated with the logged-in user.
   * Runs on component mount and whenever userId changes.
   */
  useEffect(() => {
    const fetchBookings = async () => {
      if (!userId) return;
      try {
        const res = await API.get(`/bookings/${userId}`);
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchBookings();
  }, [userId]);

  /**
   * Deletes a specific booking by its unique ID.
   * Includes a confirmation dialog for better UX.
   */
  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await API.delete(`/bookings/${id}`);
        // Optimistic UI update: remove from state without re-fetching
        setBookings(bookings.filter((b) => b._id !== id));
        alert("Booking cancelled successfully.");
      } catch (err) {
        alert("Failed to cancel the booking. Please try again.");
      }
    }
  };

  /**
   * Clears session storage and redirects user to the login page.
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("You have been logged out successfully. 👋");
    navigate("/login");
  };

  /**
   * Copies the public scheduling link to the user's clipboard.
   */
  const copyLink = () => {
    navigator.clipboard.writeText(bookingLink);
    alert("Booking link copied to clipboard! 📋");
  };

  /**
   * Persists the selected availability settings to the database.
   */
  const handleSave = async () => {
    setLoading(true);
    try {
      await API.post("/availability", availability);
      alert(`${availability.day} availability updated successfully!`);
    } catch (err) {
      alert("Failed to update availability settings.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
            <p className="text-gray-500 text-sm">Manage your schedule and appointments</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition-all font-semibold shadow-md"
          >
            Logout
          </button>
        </div>

        {/* Analytics/Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-600 p-6 rounded-2xl shadow-md text-white">
            <h3 className="text-lg font-semibold opacity-80">Total Bookings</h3>
            <p className="text-4xl font-bold">{bookings.length}</p>
          </div>
          <div className="bg-emerald-500 p-6 rounded-2xl shadow-md text-white">
            <h3 className="text-lg font-semibold opacity-80">Today's Slots</h3>
            <p className="text-4xl font-bold">
              {bookings.filter(b => b.date === new Date().toISOString().split('T')[0]).length}
            </p>
          </div>
          <div className="bg-indigo-500 p-6 rounded-2xl shadow-md text-white">
            <h3 className="text-lg font-semibold opacity-80">Scheduling Status</h3>
            <p className="text-sm mt-2 truncate font-mono bg-white/20 p-1 rounded">System Online & Active ✅</p>
          </div>
        </div>

        {/* Public Link Sharing & Availability Settings */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <label className="block text-sm font-bold text-gray-700 mb-2">Share Your Booking Link</label>
          <div className="p-4 bg-blue-50 rounded-xl flex flex-wrap gap-4 justify-between items-center border border-blue-100">
            <span className="text-sm font-mono text-blue-700 break-all">{bookingLink}</span>
            <button 
              onClick={copyLink} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all font-bold shadow-sm"
            >
              Copy Link
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Work Day</label>
              <select 
                className="w-full p-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={(e) => setAvailability({ ...availability, day: e.target.value })}
              >
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Shift Start</label>
              <input 
                type="time" className="w-full p-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                value={availability.startTime}
                onChange={(e) => setAvailability({ ...availability, startTime: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Shift End</label>
              <input 
                type="time" className="w-full p-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                value={availability.endTime}
                onChange={(e) => setAvailability({ ...availability, endTime: e.target.value })}
              />
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={loading}
            className={`mt-8 w-full md:w-auto text-white px-10 py-3 rounded-xl font-bold transition-all shadow-lg ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 hover:-translate-y-1"
            }`}
          >
            {loading ? "Saving Changes..." : "Save Availability"}
          </button>
        </div>

        {/* Appointment Data Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
            <span className="text-sm text-blue-600 font-medium bg-blue-50 px-4 py-1 rounded-full">
              {bookings.length} Total
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  {["Client Name", "Email Address", "Date", "Time Slot", "Actions"].map((header) => (
                    <th key={header} className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{b.bookedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{b.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-100">
                        {b.time}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => deleteBooking(b._id)}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                        title="Cancel Appointment"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <div className="p-12 text-center">
                <p className="text-gray-400 text-lg">No appointments scheduled yet. 📭</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;