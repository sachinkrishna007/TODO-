import { useState, useEffect } from "react";
import axios from "axios";

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([
    "10:00 AM - 10:30 AM",
    "10:30 AM - 11:00 AM",
    "11:00 AM - 11:30 AM",
    "11:30 AM - 12:00 PM",
    "12:00 PM - 12:30 PM",
    "12:30 PM - 1:00 PM",
    "2:00 PM - 2:30 PM",
    "2:30 PM - 3:00 PM",
    "3:00 PM - 3:30 PM",
    "3:30 PM - 4:00 PM",
    "4:00 PM - 4:30 PM",
    "4:30 PM - 5:00 PM",
  ]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots();
    }
  }, [selectedDate]);

  const fetchBookedSlots = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/user/bookedSlots?date=${selectedDate}`
      );
      setBookedSlots(response.data.bookedSlots);
    } catch (error) {
      console.error("Error fetching booked slots:", error);
    }
  };

  const getFilteredSlots = () => {
    return availableSlots.filter((slot) => !bookedSlots.includes(slot));
  };

  const handleBooking = async () => {
    if (!name || !phone || !selectedDate || !selectedSlot) {
      showMessage("Please fill in all fields", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/addBooking",
        {
          name,
          phone,
          date: selectedDate,
          timeSlot: selectedSlot,
        }
      );
      showMessage(response.data.message, "success");
      fetchBookedSlots();
      setName("");
      setPhone("");
      setSelectedSlot("");
    } catch (error) {
      showMessage(error.response?.data?.message || "Booking failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Book an Appointment</h2>

        {message && (
          <div
            className={`p-3 text-center rounded-md mb-4 ${
              messageType === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <label className="block text-gray-700 font-medium mb-1">Your Name:</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md mb-3"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block text-gray-700 font-medium mb-1">Phone Number:</label>
        <input
          type="tel"
          className="w-full p-2 border rounded-md mb-4"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label className="block text-gray-700 font-medium mb-1">Select Date:</label>
        <input
          type="date"
          className="w-full p-2 border rounded-md mb-3"
          value={selectedDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <label className="block text-gray-700 font-medium mb-1">Available Slots:</label>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {getFilteredSlots().map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              disabled={!selectedDate}
              className={`px-2 sm:px-4 py-3 rounded-full border text-sm text-center ${
                selectedSlot === slot ? "bg-blue-600 text-white" : "bg-gray-200"
              } hover:bg-blue-500 transition`}
            >
              {slot}
            </button>
          ))}
        </div>

        <button
          onClick={handleBooking}
          className="w-full mt-4 bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          disabled={!selectedSlot || loading}
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </div>
    </div>
  );
}
