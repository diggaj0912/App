import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Grid, User, Calendar, Users, Activity, HelpCircle, LogOut,
  Bell, Settings, CalendarCheck, Network, Award
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("Digital strategist passionate about building inclusive digital spaces. Over 10 years of experience managing editorial workflows for global tech communities.");
  
  const [events, setEvents] = useState<any[]>([]);
  const [communities, setCommunities] = useState<any[]>([]);

  // Toggles
  const [emailNotif, setEmailNotif] = useState(true);
  const [dmNotif, setDmNotif] = useState(true);
  const [commNotif, setCommNotif] = useState(false);

  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    let storedUser: any = {};
    if (rawUser) {
      try {
        storedUser = JSON.parse(rawUser);
      } catch (e) {
        storedUser = { email: rawUser, displayName: rawUser.split('@')[0] };
      }
    } else {
      // Mock user for preview if not logged in
      storedUser = { email: "alexandria.c@curatorhq.com", displayName: "Alexandria Chen" };
    }
    setUser(storedUser);
    setName(storedUser.displayName || "Alexandria Chen");
    setEmail(storedUser.email || "alexandria.c@curatorhq.com");

    if (storedUser.email) {
      fetch(`/events/${encodeURIComponent(storedUser.email)}`)
        .then(res => res.json())
        .then(data => setEvents(data))
        .catch(() => {});

      fetch(`/communities/${encodeURIComponent(storedUser.email)}`)
        .then(res => res.json())
        .then(data => setCommunities(data))
        .catch(() => {});
    }
  }, []);

  const handleSave = () => {
    const updatedUser = { ...user, displayName: name, email };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#f8f9fc] font-sans text-gray-900">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#f3f4f8] border-r border-gray-200 flex flex-col items-center py-8 shrink-0">
        <div className="w-full px-8 mb-12">
          <div className="text-[10px] font-bold tracking-widest text-[#4f46e5] uppercase">UptoHack</div>
          <div className="text-xs text-gray-500 font-medium">Editorial Suite</div>
        </div>

        <nav className="flex-1 w-full px-4 space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-white hover:shadow-sm transition-all">
            <Grid className="w-5 h-5" />
            Dashboard
          </Link>
          <div className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#4f46e5] bg-white rounded-xl shadow-sm transition-all cursor-default">
            <User className="w-5 h-5" />
            My Profile
          </div>
          <Link to="/feed" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-white hover:shadow-sm transition-all">
            <Calendar className="w-5 h-5" />
            Events
          </Link>
          <Link to="/community" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-white hover:shadow-sm transition-all">
            <Users className="w-5 h-5" />
            Community
          </Link>
          <Link to="/analytics" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-white hover:shadow-sm transition-all">
            <Activity className="w-5 h-5" />
            Analytics
          </Link>
        </nav>

        <div className="w-full px-4 space-y-4">
          <Link to="/create-event" className="block w-full py-3 text-center text-sm font-bold text-white bg-[#5a67d8] rounded-xl hover:bg-[#4c51bf] shadow-sm transition-colors">
            Create Event
          </Link>
          <button className="flex items-center w-full gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-white hover:shadow-sm transition-all">
            <HelpCircle className="w-5 h-5" />
            Help Center
          </button>
          <button onClick={handleLogout} className="flex items-center w-full gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-xl hover:bg-white hover:shadow-sm transition-all">
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-transparent">
          <div className="text-xl font-bold tracking-tight text-[#4f46e5]">UptoHack HQ</div>
          <div className="flex items-center gap-8">
            <nav className="flex gap-6 text-sm font-medium text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">Explore</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Communities</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Events</a>
            </nav>
            <div className="flex items-center gap-4 text-gray-600">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors"><Bell className="w-5 h-5" /></button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors"><Settings className="w-5 h-5" /></button>
              <img src={user.photoURL || "https://picsum.photos/seed/alex/100/100"} alt="User" className="w-9 h-9 rounded-full ml-2 border border-gray-200" />
            </div>
          </div>
        </header>

        <div className="px-8 pb-12 max-w-5xl mx-auto">
          {/* Banner & Profile Info */}
          <div className="relative mt-4 mb-20">
            <div className="h-64 bg-[#f1f3f5] rounded-3xl w-full"></div>
            <div className="absolute -bottom-12 left-10 flex items-end">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                  <img src={user.photoURL || "https://picsum.photos/seed/alex/200/200"} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="mb-2 ml-6">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{name}</h1>
                <p className="text-gray-600 font-medium">Digital Strategist & Community Architect</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Events Attended</p>
                <p className="text-3xl font-bold text-gray-900">{events.length > 0 ? events.length : 42}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                <Network className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Communities Joined</p>
                <p className="text-3xl font-bold text-gray-900">{communities.length > 0 ? communities.length : 12}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Certificates Earned</p>
                <p className="text-3xl font-bold text-gray-900">08</p>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100 px-6">
              <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">About</button>
              <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Activity Feed</button>
              <button className="px-6 py-4 text-sm font-medium text-[#4f46e5] border-b-2 border-[#4f46e5]">Settings</button>
            </div>

            <div className="p-10">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-[#f8f9fa] border-2 border-transparent focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-[#f8f9fa] border-2 border-transparent focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Professional Bio</label>
                  <textarea 
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    rows={4}
                    className="w-full bg-[#f8f9fa] border-2 border-transparent focus:bg-white focus:border-indigo-100 focus:ring-4 focus:ring-indigo-50 rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-6 mt-12">Notification Preferences</h3>
              
              <div className="space-y-4 mb-12">
                <div className="flex items-center justify-between p-5 bg-[#f8f9fa] rounded-xl">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Email Notifications</h4>
                    <p className="text-xs text-gray-500 mt-1">Receive weekly summaries and event invitations.</p>
                  </div>
                  <button 
                    onClick={() => setEmailNotif(!emailNotif)} 
                    className={`w-12 h-6 rounded-full transition-colors relative ${emailNotif ? 'bg-[#5a67d8]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${emailNotif ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-5 bg-[#f8f9fa] rounded-xl">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Direct Messages</h4>
                    <p className="text-xs text-gray-500 mt-1">Allow community members to message you directly.</p>
                  </div>
                  <button 
                    onClick={() => setDmNotif(!dmNotif)} 
                    className={`w-12 h-6 rounded-full transition-colors relative ${dmNotif ? 'bg-[#5a67d8]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${dmNotif ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-5 bg-[#f8f9fa] rounded-xl">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Community Activity</h4>
                    <p className="text-xs text-gray-500 mt-1">Get notified when someone interacts with your posts.</p>
                  </div>
                  <button 
                    onClick={() => setCommNotif(!commNotif)} 
                    className={`w-12 h-6 rounded-full transition-colors relative ${commNotif ? 'bg-[#5a67d8]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${commNotif ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-6 pt-6 border-t border-gray-100">
                <button className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">
                  Discard Changes
                </button>
                <button onClick={handleSave} className="bg-[#5a67d8] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#4c51bf] shadow-lg shadow-indigo-500/30 transition-all">
                  Save Profile Settings
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
