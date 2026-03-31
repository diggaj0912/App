import { useState } from "react";
import { Link } from "react-router-dom";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    whatsapp: false,
    meeting: false,
    certificate: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Event Created:", form);
    alert("Event Created Successfully 🚀");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-5">
        <h1 className="text-xl font-bold mb-6">Curator</h1>

        <nav className="flex flex-col gap-4">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/event">Events</Link>
          <Link to="/community">Community</Link>
          <Link to="/create-event" className="text-indigo-600 font-medium">
            Create Event
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        
        <h2 className="text-2xl font-semibold mb-6">Create New Event</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-sm border max-w-2xl"
        >
          
          {/* Title */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Event Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter event title"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter description"
              rows={4}
              required
            />
          </div>

          {/* Date & Time */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-medium">Time</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="mb-6 space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="whatsapp"
                checked={form.whatsapp}
                onChange={handleChange}
              />
              Auto-create WhatsApp group
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="meeting"
                checked={form.meeting}
                onChange={handleChange}
              />
              Enable meeting link
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="certificate"
                checked={form.certificate}
                onChange={handleChange}
              />
              Generate certificates
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600"
          >
            Create Event
          </button>

        </form>

      </div>
    </div>
  );
}
