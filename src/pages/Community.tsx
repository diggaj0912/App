import { Link } from "react-router-dom";

export default function Community() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-5">
        <h1 className="text-xl font-bold mb-6">Curator</h1>

        <nav className="flex flex-col gap-4">
          <Link to="/" className="hover:text-indigo-500">Home</Link>
          <Link to="/dashboard" className="hover:text-indigo-500">Dashboard</Link>
          <Link to="/event" className="hover:text-indigo-500">Events</Link>
          <Link to="/community" className="text-indigo-600 font-medium">Community</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Community Header */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
          <h2 className="text-2xl font-semibold">AI Developers Community</h2>
          <p className="text-gray-500 mt-2">1,250 Members • Active discussions</p>

          <div className="mt-4">
            <button onClick={() => console.log("You have joined the community!")} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
              Join Community
            </button>
          </div>
        </div>

        {/* Feed + Events Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT: FEED */}
          <div className="lg:col-span-2 space-y-6">

            {/* Post */}
            <div className="bg-white p-5 rounded-xl shadow-sm border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <h4 className="font-semibold">Diggaj Sharma</h4>
                  <p className="text-gray-400 text-sm">2 hours ago</p>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                Anyone interested in forming a team for the upcoming hackathon? 🚀
              </p>

              <div className="flex gap-4 mt-4 text-gray-500 text-sm">
                <button onClick={() => alert("Liked!")}>👍 Like</button>
                <button onClick={() => alert("Opening comment section...")}>💬 Comment</button>
              </div>
            </div>

            {/* Post 2 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <h4 className="font-semibold">Srishti</h4>
                  <p className="text-gray-400 text-sm">5 hours ago</p>
                </div>
              </div>

              <p className="mt-4 text-gray-700">
                Sharing resources for learning Agentic AI — check this out!
              </p>

              <div className="flex gap-4 mt-4 text-gray-500 text-sm">
                <button onClick={() => alert("Liked!")}>👍 Like</button>
                <button onClick={() => alert("Opening comment section...")}>💬 Comment</button>
              </div>
            </div>

          </div>

          {/* RIGHT: EVENTS */}
          <div className="space-y-6">

            <div className="bg-white p-5 rounded-xl shadow-sm border">
              <h3 className="font-semibold mb-4">Community Events</h3>

              <div className="space-y-4">

                <div>
                  <h4 className="font-medium">Hackathon 2026</h4>
                  <p className="text-gray-500 text-sm">March 30</p>

                  <Link to="/event" className="mt-2 text-indigo-600 text-sm inline-block hover:underline">
                    View Event →
                  </Link>
                </div>

                <div>
                  <h4 className="font-medium">AI Workshop</h4>
                  <p className="text-gray-500 text-sm">April 5</p>

                  <Link to="/event" className="mt-2 text-indigo-600 text-sm inline-block hover:underline">
                    View Event →
                  </Link>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
