import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { BarChart3, LogOut, Menu, X } from "lucide-react";
import NotificationBell from "./NotificationBell";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">Curator</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/create-event"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              Create Event
            </Link>
            <Link
              to="/community"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              Community
            </Link>
            <Link
              to="/analytics"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <NotificationBell />

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/create-event"
              className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
            >
              Create Event
            </Link>
            <Link
              to="/community"
              className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
            >
              Community
            </Link>
            <Link
              to="/analytics"
              className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
