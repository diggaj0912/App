import { Link } from "react-router-dom";

export default function Certificates() {
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
          <Link to="/create-event">Create Event</Link>
          <Link to="/certificates" className="text-indigo-600 font-medium">
            Certificates
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        <h2 className="text-2xl font-semibold mb-6">Your Certificates</h2>

        {/* Certificate Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Certificate Card */}
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-lg">Hackathon 2026</h3>
            <p className="text-gray-500 mt-2">Issued on: March 30, 2026</p>

            <div className="mt-4 flex gap-3">
              <button onClick={() => console.log("Opening certificate preview...")} className="text-indigo-600 text-sm hover:underline">
                Preview
              </button>

              <button
                onClick={() => alert("Downloading certificate...")}
                className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-600"
              >
                Download
              </button>
            </div>
          </div>

          {/* Certificate Card 2 */}
          <div className="bg-white p-5 rounded-xl shadow-sm border">
            <h3 className="font-semibold text-lg">AI Workshop</h3>
            <p className="text-gray-500 mt-2">Issued on: April 5, 2026</p>

            <div className="mt-4 flex gap-3">
              <button onClick={() => console.log("Opening certificate preview...")} className="text-indigo-600 text-sm hover:underline">
                Preview
              </button>

              <button
                onClick={() => alert("Downloading certificate...")}
                className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-indigo-600"
              >
                Download
              </button>
            </div>
          </div>

        </div>

        {/* Empty State (optional future) */}
        <div className="mt-10 text-center text-gray-400">
          No more certificates yet 🚀
        </div>

      </div>
    </div>
  );
}
