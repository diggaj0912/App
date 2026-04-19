import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Search,
  Bell,
  Settings,
  Users,
  Calendar,
  Award,
  User,
  Plus,
  HelpCircle,
  LogOut,
  ArrowRight,
  MessageSquare,
  UserPlus,
  Compass,
  CheckCircle2,
  Network
} from "lucide-react";

export default function Dashboard() {
  const [time, setTime] = useState("");
  const [dark, setDark] = useState(document.documentElement.classList.contains("dark"));

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const notifyAll = () => {
    const { socket } = require("../App");
    socket.emit("send-notification", {
      message: "New event created 🚀"
    });
  };

  const userString = localStorage.getItem("user");
  let user: any = {};
  try {
    user = JSON.parse(userString || "{}");
  } catch (e) {
    user = { email: userString };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex h-screen overflow-hidden ${dark ? "bg-slate-900 text-white" : "bg-[#f8f9fa] font-sans text-gray-900"}`}>
      {/* Sidebar */}
      <aside className={`w-64 border-r flex-col justify-between hidden md:flex z-10 shrink-0 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"}`}>
        <div>
          {/* Logo */}
          <div className="h-20 flex items-center px-6 gap-3">
            <div className="w-1.5 h-6 bg-[#7c3aed] rounded-full"></div>
            <span className="text-xl font-bold tracking-tight">UptoHack</span>
          </div>

          {/* Nav Menu */}
          <div className="px-4 mt-4">
            <div className="px-2 mb-6">
              <div className="text-[10px] font-bold text-[#7c3aed] tracking-widest uppercase">UptoHack Pro</div>
              <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-0.5">Elite Management</div>
            </div>

            <nav className="flex flex-col gap-2">
              <Link to="/community" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm">
                <Users className="w-5 h-5" />
                Communities
              </Link>
              <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 text-[#7c3aed] rounded-xl transition-colors font-medium text-sm">
                <Calendar className="w-5 h-5" />
                Events
              </Link>
              <Link to="/certificates" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm">
                <Award className="w-5 h-5" />
                Certificates
              </Link>
              <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm">
                <User className="w-5 h-5" />
                Profile
              </Link>
            </nav>
          </div>
        </div>

        <div className="p-4 space-y-2 mb-4">
          <Link to="/create-event" className="w-full bg-[#7c3aed] text-white py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 hover:scale-105 hover:bg-[#6d28d9] transition-all">
            <Plus className="w-4 h-4" />
            Create Event
          </Link>
          <button onClick={notifyAll} className="w-full bg-emerald-500 text-white py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all mt-4">
            <Bell className="w-4 h-4" />
            Test Notifications
          </button>
          <button onClick={() => alert("Help Center opened")} className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm mt-4">
            <HelpCircle className="w-5 h-5" />
            Help
          </button>
          <Link to="/login" className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm">
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className={`h-20 flex items-center justify-between px-8 shrink-0 ${dark ? "bg-slate-900" : "bg-[#f8f9fa]"}`}>
          <div className="flex items-center gap-4">
            <div className={`flex items-center border rounded-full px-4 py-2.5 w-72 shadow-sm ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-100"}`}>
              <Search className="w-4 h-4 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search communities..."
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400"
              />
            </div>
            <div className={`text-sm font-medium ${dark ? "text-gray-300" : "text-gray-500"}`}>{time}</div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleDark} className="p-2 text-sm font-bold border rounded-xl hover:bg-opacity-50 transition-colors">
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button onClick={() => alert("Notifications")} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button onClick={() => alert("Settings")} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <Link to="/login" className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm ml-2 hover:ring-2 hover:ring-indigo-500 transition-all">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8lsF7EjahYQvzMul7Z0r2GeyQlpvZCf_SR0R8foON7kwsJ8aoAFX45_94TM2TJrADixtJ18B419bxaDIu9C_4mMh8ugDCgXjqXpZQCDsRDZ3JnCBahEvuEzaGTZ7ckPYZfePRYbZ1IWadAzmtycVkuKblaW6F9YdMYAKzAeOjJz_OPYIqeuzcNKrc3a_UkSOu4BH9YJPcW1DH_F3NI6NHW00gUKR8zobwV4_ujqHOytWIa67JG2YTIK6fxWc4L19xZ63OiJCh131o" alt="Login / Signup" className="w-full h-full object-cover" />
            </Link>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            {/* Greeting */}
            <div className="mt-4 mb-10">
              <h1 className="text-4xl font-bold tracking-tight">
                Welcome back, {user.displayName || user.name || user.email || 'Guest'} 👋
              </h1>
              <p className={`${dark ? "text-slate-400" : "text-gray-500"} mt-3 text-lg`}>
                Your community engagement is up by <span className="text-[#7c3aed] font-bold">14%</span> this week. Here is what's happening in your networks.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {/* Card 1 */}
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between h-48">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#7c3aed]" />
                  </div>
                  <span className="bg-purple-50 text-[#7c3aed] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    +2 This Month
                  </span>
                </div>
                <div>
                  <div className="text-5xl font-bold text-gray-900 tracking-tight">12</div>
                  <div className="text-gray-500 font-medium mt-1">Events Joined</div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#7c3aed] rounded-[2rem] p-8 text-white relative overflow-hidden h-48 flex flex-col justify-between shadow-lg shadow-purple-500/20">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                
                {/* Decorative circles to match screenshot */}
                <div className="absolute bottom-4 right-4 flex items-end opacity-20">
                  <div className="w-16 h-16 rounded-full bg-white -mr-6 z-10"></div>
                  <div className="w-24 h-24 rounded-full bg-white"></div>
                </div>

                <div className="flex justify-between items-start relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Network className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white/80 text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider">
                    Active Now
                  </span>
                </div>
                <div className="relative z-10">
                  <div className="text-5xl font-bold tracking-tight">5</div>
                  <div className="text-white/80 font-medium mt-1">Communities Managed</div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between h-48">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#f4f6f0] flex items-center justify-center">
                    <Award className="w-6 h-6 text-[#5a6b31]" />
                  </div>
                  <span className="bg-[#d4ed31] text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-900"></span> Live
                  </span>
                </div>
                <div>
                  <div className="text-5xl font-bold text-gray-900 tracking-tight">8</div>
                  <div className="text-gray-500 font-medium mt-1">Certificates Earned</div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column (Events & Admin Actions) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Admin Actions */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Organizer Controls</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button onClick={() => alert('Bulk email system triggered!')} className="bg-indigo-50 text-[#7c3aed] rounded-xl p-4 text-left hover:bg-indigo-100 transition-colors">
                      <div className="font-bold text-sm mb-1">Bulk Email</div>
                      <div className="text-xs opacity-80">Message all members</div>
                    </button>
                    <button onClick={() => alert('One-click bulk certificates issued!')} className="bg-amber-50 text-amber-600 rounded-xl p-4 text-left hover:bg-amber-100 transition-colors">
                      <div className="font-bold text-sm mb-1">1-Click Certificates</div>
                      <div className="text-xs opacity-80">Issue for past events</div>
                    </button>
                    <button onClick={() => alert('Admin invite link generated: https://uptohack.com/join/admin-123')} className="bg-emerald-50 text-emerald-600 rounded-xl p-4 text-left hover:bg-emerald-100 transition-colors">
                      <div className="font-bold text-sm mb-1">Admin Share</div>
                      <div className="text-xs opacity-80">Share access to event</div>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                  <Link to="/event" className="text-[#7c3aed] font-semibold text-sm flex items-center gap-1 hover:underline">
                    View All <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Event Card 1 */}
                <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-64 h-48 rounded-2xl overflow-hidden relative shrink-0">
                    <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" alt="Event" className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-white rounded-xl px-3 py-2 text-center shadow-sm">
                      <div className="text-[10px] font-bold text-gray-500 uppercase leading-none mb-1">Oct</div>
                      <div className="text-xl font-bold text-gray-900 leading-none">24</div>
                    </div>
                  </div>
                  <div className="flex-1 py-2 pr-4 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-purple-50 text-[#7c3aed] text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">Hybrid</span>
                      <span className="text-gray-400 text-xs font-medium flex items-center gap-1">
                        <Users className="w-3 h-3" /> 320 Attending
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">Digital Strategy Summit 2024</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                      Join industry leaders for an intensive workshop on modern growth hacking and...
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPRpXCcjUcWsjus0s93OWH04XBwErzEWPU6RnF_x6S_Bvrk86P6vRNRwE7dqmTkWb-0BC0LIQDASSKxugicVZ7hsGVNGitdRiBrnPm3aoE5mhOdjGWVRI9mWJXrLT7MOii8bgBYt-1ddTmw5biaTIqeSCU-kGOmH5pacMripYn9koYqNmi-8ZMvogLP1dZZbJOJAv0oR73s62jX47ULZKkyN77TkUaRyXwk9pRC6DAoXem4gMPLs8XvbFMy_J4XDRxxkgf8pss8O8-" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhoBYo6_E99LSlc2KRDC_4dto6huzN77Q2Z2Bcd2KiBUaE65vNnKSa9sbcPpupQaP8eQuYzCOoMcBPy2lyOitI9tO-w2zhdaavyd60qYotpBQnzfua2z1gAGM4N38udBzTRLG4btoNYEWMDLyUfpcvb7NTTWlswCRvnGWlnU39IPezQESQ994aL7J3KY7JxDdlsusZLAfvKWEKGU_U_0Mcetes9xJYTqFADGUpjuR3MQbH3IyY2Uwp8BIFjuFWi9aYT_l0IM9mTj_7" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg-FLDCi1ZFjZnZRfq4HJd7X2jdBiCG9cG2l-fT2iQlCtRxQ4nPYvQQwvWAl-yDVcqGf3bjYUfkXIc6NW_-VHvYYlJA4q8l91clBIzr3JuSzssQsT5QWHN2GIj9opjglPJjKOmb6ZaYBjpLlDP9LSMePx3-hXqLIurKP9mwD3LWJArXaH6n6tUcQbOWN04k3RNVv5sBThiTtAaZNbT4H1s3vJ8oqkmyl7B1JXKh6x4gaWSn7J526FGcCIrgmHcZk4a4ZJ21yySVMnV" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                        </div>
                        <span className="text-xs font-medium text-gray-500">+317</span>
                      </div>
                      <Link to="/event" className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Skeleton Card */}
                <div className="bg-white/50 rounded-[2rem] p-6 shadow-sm border border-gray-100 flex gap-6 animate-pulse">
                  <div className="w-48 h-32 bg-gray-100 rounded-2xl shrink-0"></div>
                  <div className="flex-1 py-2 space-y-4">
                    <div className="flex gap-2">
                      <div className="w-16 h-5 bg-gray-100 rounded-md"></div>
                      <div className="w-24 h-5 bg-gray-100 rounded-md"></div>
                    </div>
                    <div className="w-3/4 h-6 bg-gray-100 rounded-md"></div>
                    <div className="w-full h-4 bg-gray-100 rounded-md"></div>
                    <div className="w-2/3 h-4 bg-gray-100 rounded-md"></div>
                    <div className="flex justify-between items-end pt-2">
                      <div className="flex gap-1">
                        <div className="w-6 h-6 bg-gray-100 rounded-full"></div>
                        <div className="w-6 h-6 bg-gray-100 rounded-full"></div>
                        <div className="w-6 h-6 bg-gray-100 rounded-full"></div>
                      </div>
                      <div className="w-20 h-8 bg-gray-100 rounded-xl"></div>
                    </div>
                  </div>
                </div>

                {/* Empty State Card */}
                <div className="bg-white rounded-[2rem] p-12 shadow-sm border border-gray-100 flex flex-col items-center text-center mt-6">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <Users className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No communities yet</h3>
                  <p className="text-gray-500 max-w-sm mb-8">
                    Join or create a community to start managing your events and certificates efficiently.
                  </p>
                  <Link to="/community" className="bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold transition-colors inline-block">
                    Explore Communities
                  </Link>
                </div>
              </div>

              {/* Right Column (Activity & Circles) */}
              <div className="lg:col-span-1 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Activity</h2>
                
                {/* Activity Feed */}
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                  <div className="space-y-8">
                    {/* Item 1 */}
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-[#7c3aed]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 font-medium">
                          You earned <span className="text-[#7c3aed]">Community Architect</span>.
                        </p>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1 block">2 Hours Ago</span>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 font-medium">
                          Sarah Jenkins posted in <span className="font-bold">Creative Network</span>.
                        </p>
                        <div className="bg-gray-50 rounded-xl p-4 mt-3">
                          <p className="text-sm text-gray-600 italic">"Excited to share the final results from the spring workshop series..."</p>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-3 block">5 Hours Ago</span>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                        <UserPlus className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 font-medium">
                          New member joined <span className="font-bold">Design Enthusiasts</span>.
                        </p>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1 block">Yesterday</span>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => alert("Loading more activity...")} className="w-full mt-8 bg-gray-50 hover:bg-gray-100 text-gray-900 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors">
                    Expand Activity Feed
                  </button>
                </div>

                {/* New Circles */}
                <div className="bg-[#1e293b] rounded-[2rem] p-8 text-white relative overflow-hidden mt-6">
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/5 rounded-full"></div>
                  </div>
                  <Compass className="absolute bottom-6 right-6 w-24 h-24 text-white/5 -rotate-12" />
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3">New Circles</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-[200px]">
                      Discover elite networks curated for startup founders and lead designers.
                    </p>
                    <Link to="/community" className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold text-sm inline-flex items-center gap-2 hover:bg-gray-100 transition-colors">
                      Explore <Compass className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
