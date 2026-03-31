import { Link } from "react-router-dom";

export default function Feed() {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-5">
        <h1 className="text-xl font-bold mb-6">Curator</h1>

        <nav className="flex flex-col gap-4">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/feed" className="text-indigo-600 font-medium">Feed</Link>
          <Link to="/event">Events</Link>
          <Link to="/community">Community</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        <h2 className="text-2xl font-semibold mb-6">Community Feed</h2>

        {/* ONGOING EVENTS */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-green-600">
            🔴 Ongoing Events
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h4 className="font-semibold">Hackathon 2026</h4>
              <p className="text-gray-500 text-sm mt-1">Live now</p>

              <div className="mt-3 flex gap-3">
                <button onClick={() => alert("Joined event!")} className="bg-green-500 text-white px-3 py-1 rounded">
                  Join Now
                </button>
                <Link to="/event" className="text-indigo-600 text-sm hover:underline flex items-center">
                  View →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* UPCOMING EVENTS */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-yellow-600">
            🟡 Upcoming Events
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <h4 className="font-semibold">AI Workshop</h4>
              <p className="text-gray-500 text-sm mt-1">April 5</p>

              <div className="mt-3 flex gap-3">
                <button onClick={() => alert("Registered for event!")} className="bg-indigo-500 text-white px-3 py-1 rounded">
                  Register
                </button>
                <Link to="/event" className="text-indigo-600 text-sm hover:underline flex items-center">
                  View →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SOCIAL POSTS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            💬 Community Discussions
          </h3>

          <div className="space-y-4">

            {/* Post 1 */}
            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <h4 className="font-semibold">Diggaj Sharma</h4>
                  <p className="text-gray-400 text-sm">1 hour ago</p>
                </div>
              </div>

              <p className="mt-3 text-gray-700">
                Anyone joining the hackathon? Looking for teammates 🚀
              </p>

              <div className="flex gap-4 mt-3 text-sm text-gray-500">
                <button onClick={() => alert("Liked!")}>👍 Like</button>
                <button onClick={() => alert("Opening comment section...")}>💬 Comment</button>
              </div>
            </div>

            {/* Post 2 */}
            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <h4 className="font-semibold">Srishti</h4>
                  <p className="text-gray-400 text-sm">3 hours ago</p>
                </div>
              </div>

              <p className="mt-3 text-gray-700">
                Sharing AI learning resources, must check!
              </p>

              <div className="flex gap-4 mt-3 text-sm text-gray-500">
                <button onClick={() => alert("Liked!")}>👍 Like</button>
                <button onClick={() => alert("Opening comment section...")}>💬 Comment</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
