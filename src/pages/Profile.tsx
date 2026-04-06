import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [communities, setCommunities] = useState<any[]>([]);
  const [communityName, setCommunityName] = useState("");

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    let storedUser: any = {};
    if (rawUser) {
      try {
        storedUser = JSON.parse(rawUser);
      } catch (e) {
        // Fallback if the user is stored as a plain string (like an email)
        storedUser = { email: rawUser, displayName: rawUser.split('@')[0] };
      }
    }
    setUser(storedUser);
    setName(storedUser.displayName || "");

    if (storedUser.email) {
      // Fetch user events
      fetch(`/events/${storedUser.email}`)
        .then(res => res.json())
        .then(data => setEvents(data))
        .catch(err => console.error("Error fetching events:", err));

      // Fetch user communities
      fetch(`/communities/${storedUser.email}`)
        .then(res => res.json())
        .then(data => setCommunities(data))
        .catch(err => console.error("Error fetching communities:", err));
    }
  }, []);

  const createCommunity = async () => {
    if (!communityName || !user?.email) return;
    try {
      await fetch("/create-community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: communityName,
          owner: user.email,
        }),
      });
      alert("Community Created 🚀");
      setCommunityName("");
      // Refresh communities
      fetch(`/communities/${user.email}`)
        .then(res => res.json())
        .then(data => setCommunities(data));
    } catch (err) {
      console.error("Error creating community:", err);
    }
  };

  const handleSave = () => {
    const updatedUser = { ...user, displayName: name };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert("Profile updated ✅");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-5">
        <h1 className="text-xl font-bold mb-6">Curator</h1>

        <nav className="flex flex-col gap-4">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/feed">Feed</Link>
          <Link to="/community">Community</Link>
          <Link to="/profile" className="text-indigo-600 font-medium">
            Profile
          </Link>
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">

        {/* Profile Header */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-6 flex items-center gap-4">
          <img
            src={user.photoURL || "https://via.placeholder.com/80"}
            className="w-20 h-20 rounded-full"
            alt="Profile"
          />

          <div>
            <h2 className="text-xl font-semibold">
              {user.displayName || "User"}
            </h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Edit Profile */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
          <h3 className="font-semibold mb-4">Edit Profile</h3>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 rounded w-full mb-4"
            placeholder="Enter name"
          />

          <button
            onClick={handleSave}
            className="bg-indigo-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>

        {/* My Events */}
        <div className="bg-white p-5 rounded-xl border mb-6">
          <h3 className="font-semibold mb-3">My Events</h3>
          {events.length === 0 ? (
            <p className="text-gray-500 text-sm">No events created yet.</p>
          ) : (
            events.map((e: any) => (
              <div key={e.id} className="border p-3 rounded mb-2">
                {e.title}
              </div>
            ))
          )}
        </div>

        {/* My Communities */}
        <div className="bg-white p-5 rounded-xl border mb-6">
          <h3 className="font-semibold mb-3">My Communities</h3>
          {communities.length === 0 ? (
            <p className="text-gray-500 text-sm">No communities joined yet.</p>
          ) : (
            communities.map((c: any) => (
              <div key={c.id} className="border p-3 rounded mb-2">
                {c.name}
              </div>
            ))
          )}
        </div>

        {/* Create Community */}
        <div className="bg-white p-5 rounded-xl border mb-6">
          <h3 className="font-semibold mb-3">Create Community</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              className="border px-4 py-2 rounded flex-1"
              placeholder="Community Name"
            />
            <button
              onClick={createCommunity}
              className="bg-indigo-500 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </div>

        {/* My Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <Link to="/create-event">
            <div className="bg-white p-5 rounded-xl border shadow-sm cursor-pointer hover:shadow-md">
              <h4 className="font-semibold">Create Event</h4>
              <p className="text-gray-500 text-sm mt-1">
                Host your own event
              </p>
            </div>
          </Link>

          <div className="bg-white p-5 rounded-xl border shadow-sm cursor-pointer hover:shadow-md">
            <h4 className="font-semibold">Create Community</h4>
            <p className="text-gray-500 text-sm mt-1">
              Build your own community
            </p>
          </div>

          <Link to="/certificates">
            <div className="bg-white p-5 rounded-xl border shadow-sm cursor-pointer hover:shadow-md">
              <h4 className="font-semibold">Certificates</h4>
              <p className="text-gray-500 text-sm mt-1">
                View your achievements
              </p>
            </div>
          </Link>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>
    </div>
  );
}
