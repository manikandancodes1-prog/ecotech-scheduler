import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "./api";

/**
 * BookingPage Component
 * Provides a public interface for clients to schedule appointments based on user availability.
 */
const BookingPage = () => {
  const { userId } = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  // States for handling the specific slot selection and client information
  const [selectedSlot, setSelectedSlot] = useState(null); 
  const [bookerInfo, setBookerInfo] = useState({ name: "", email: "" }); 

  // Detect user's local timezone for a better scheduling experience
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // Restrict past date selection in the UI
  const today = new Date().toISOString().split("T")[0];

  /**
   * Generates 30-minute intervals between the provided start and end times.
   * @param {string} start - Format "HH:mm"
   * @param {string} end - Format "HH:mm"
   */
  const generateSlots = (start, end) => {
    let startTime = parseInt(start.split(":")[0]) * 60 + parseInt(start.split(":")[1]);
    let endTime = parseInt(end.split(":")[0]) * 60 + parseInt(end.split(":")[1]);
    let allSlots = [];

    for (let i = startTime; i < endTime; i += 30) {
      let h = Math.floor(i / 60).toString().padStart(2, "0");
      let m = (i % 60).toString().padStart(2, "0");
      allSlots.push(`${h}:${m}`);
    }
    return allSlots;
  };

  /**
   * Handles date changes, fetches user availability for that day,
   * and cross-references already booked slots to prevent double-booking.
   */
  const handleDateChange = async (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedSlot(null); // Reset selection when date changes
    const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "long" });

    setLoading(true); 
    try {
      // Fetch defined availability for the user
      const availRes = await API.get(`/availability/${userId}`);
      const dayData = availRes.data.find((d) => d.day === dayName);
      
      // Fetch slots that are already reserved for the selected date
      const bookedRes = await API.get(`/bookings/check/${userId}/${date}`);
      setBookedSlots(bookedRes.data);

      if (dayData) {
        setSlots(generateSlots(dayData.startTime, dayData.endTime));
      } else {
        setSlots([]);
        alert("The user has no availability set for this day.");
      }
    } catch (err) {
      console.error("Error fetching scheduling data:", err);
    }
    setLoading(false); 
  };

  /**
   * Submits the booking request to the backend with validation.
   */
  const handleFinalBooking = async () => {
    const { name, email } = bookerInfo;
    
    if (!name || !email) return alert("Please provide both name and email.");

    // Simple Email Regex Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return alert("Please enter a valid email address.");

    try {
      setLoading(true);
      await API.post("/bookings", {
        userId,
        bookedBy: name,
        email,
        date: selectedDate,
        time: selectedSlot
      });
      
      alert("Appointment Booked Successfully! 🎉");
      
      // Update local state to immediately disable the newly booked slot
      setBookedSlots([...bookedSlots, selectedSlot]);
      setSelectedSlot(null); 
      setBookerInfo({ name: "", email: "" }); 
    } catch (err) {
      alert("This slot may have just been taken. Please try another.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Schedule a Meeting</h2>
        
        <p className="text-center text-sm text-gray-500 mb-6">
          Times are shown in <b>{userTimezone}</b>
        </p>
        
        <label className="block text-sm font-medium mb-2 text-gray-700">Select Date:</label>
        <input 
          type="date" 
          min={today}
          className="w-full p-3 border rounded-lg mb-6 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={handleDateChange} 
        />

        {loading && !selectedSlot && (
          <p className="text-center text-blue-600 font-medium animate-pulse">Fetching available slots...</p>
        )}

        {!loading && slots.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Available Slots:</h3>
            <div className="grid grid-cols-3 gap-3">
              {slots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = selectedSlot === slot;
                
                return (
                  <button 
                    key={slot} 
                    disabled={isBooked || (loading && !isSelected)}
                    className={`p-3 rounded-xl transition-all border-2 font-semibold text-sm ${
                      isBooked 
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-transparent"
                        : isSelected 
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-105" 
                        : "bg-white text-blue-600 border-blue-100 hover:border-blue-500 hover:bg-blue-50"
                    }`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot} {isBooked && "❌"}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Booking Form - Appears only when a slot is selected */}
        {selectedSlot && (
          <div className="mt-8 p-6 border-t-2 border-blue-50 bg-gray-50 rounded-xl transition-all">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Confirming Slot: <span className="text-blue-600">{selectedSlot}</span>
            </h3>
            
            <div className="space-y-4">
              <input 
                type="text" placeholder="Full Name" 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
                value={bookerInfo.name}
                onChange={(e) => setBookerInfo({ ...bookerInfo, name: e.target.value })}
              />
              <input 
                type="email" placeholder="Email Address" 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
                value={bookerInfo.email}
                onChange={(e) => setBookerInfo({ ...bookerInfo, email: e.target.value })}
              />
              <button 
                onClick={handleFinalBooking}
                disabled={loading}
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md disabled:bg-gray-400 disabled:shadow-none"
              >
                {loading ? "Processing..." : "Confirm Booking 🚀"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;