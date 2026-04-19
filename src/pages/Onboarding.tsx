import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleSubmit = async () => {
    try {
      await fetch("/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          username,
          bio,
        }),
      });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 font-sans">
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 max-w-md w-full">
        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">👋</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Complete your profile</h1>
          <p className="text-sm text-gray-500 mt-2">Let's get to know you a bit better.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900">Username</label>
            <input
              placeholder="@username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#f8f9fa] border-2 border-transparent focus:border-indigo-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 rounded-xl py-3 px-4 text-sm text-gray-900 transition-all outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-900">Bio</label>
            <textarea
              placeholder="Tell us about yourself..."
              rows={4}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-[#f8f9fa] border-2 border-transparent focus:border-indigo-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 rounded-xl py-3 px-4 text-sm text-gray-900 transition-all outline-none resize-none"
            />
          </div>

          <button 
            onClick={handleSubmit} 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/30 mt-4"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
