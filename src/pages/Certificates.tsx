import { Link } from "react-router-dom";
import {
  Bell,
  Settings,
  Users,
  Calendar,
  Award,
  User,
  HelpCircle,
  LogOut,
  CheckCircle2,
  Share2,
  Plus,
  ListFilter
} from "lucide-react";

export default function Certificates() {
  const certificates = [
    {
      id: "CR-99210",
      title: "Global Design Summit 2024: Advanced UX",
      description: "Awarded for excellence in interactive systems architecture and user behavioral analysis.",
      date: "Oct 12, 2024",
      image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=800&auto=format&fit=crop",
      verified: true
    },
    {
      id: "CR-88124",
      title: "Leadership in Digital Innovation",
      description: "Recognition of successful management of cross-functional teams in the 2023 incubator program.",
      date: "Aug 05, 2024",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
      verified: true
    },
    {
      id: "CR-77241",
      title: "Open Source Community Contributor",
      description: "Commendation for significant code contributions to the Curator Core framework throughout Q2.",
      date: "June 21, 2024",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
      verified: true,
      showShare: true
    },
    {
      id: "CR-66512",
      title: "Product Strategy Masterclass",
      description: "Comprehensive mastery of market positioning, user journey mapping, and lifecycle management.",
      date: "May 15, 2024",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
      verified: true
    }
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f8f9fa] border-r border-gray-100 flex-col justify-between hidden md:flex z-10 shrink-0">
        <div>
          {/* Nav Menu */}
          <div className="px-6 mt-8">
            <div className="mb-8">
              <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Curator Pro</div>
              <div className="text-sm font-bold text-gray-900 mt-1">Elite Management</div>
            </div>

            <nav className="flex flex-col gap-2">
              <Link to="/community" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm">
                <Users className="w-5 h-5" />
                Communities
              </Link>
              <Link to="/event" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm">
                <Calendar className="w-5 h-5" />
                Events
              </Link>
              <Link to="/certificates" className="flex items-center gap-3 px-4 py-3 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 text-[#7c3aed] rounded-xl transition-colors font-medium text-sm">
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

        <div className="p-6 space-y-2 mb-4">
          <button onClick={() => alert("Help Center opened")} className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm mt-4">
            <HelpCircle className="w-5 h-5" />
            Help
          </button>
          <Link to="/login" className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm">
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold tracking-tight">Curator</span>
            <div className="hidden md:flex gap-6">
              <Link to="/community" className="text-gray-500 hover:text-gray-900 text-sm transition-all duration-300">
                Communities
              </Link>
              <Link to="/event" className="text-gray-500 hover:text-gray-900 text-sm transition-all duration-300">
                Events
              </Link>
              <Link to="/certificates" className="text-[#7c3aed] font-semibold text-sm transition-all duration-300">
                Certificates
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
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
        <div className="flex-1 overflow-y-auto p-8 md:p-12">
          
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-10">
              <div className="text-[10px] font-bold text-[#7c3aed] tracking-widest uppercase mb-2">Academic Achievement</div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                Your Earned<br/>Certificates
              </h1>
              <p className="text-gray-600 text-base max-w-2xl leading-relaxed">
                A digital record of your professional milestones and community contributions. Each certificate is cryptographically verified and ready for distribution.
              </p>
            </div>

            {/* Filters */}
            <div className="bg-[#f1f3f5] rounded-full p-1.5 flex items-center justify-between mb-10">
              <div className="flex items-center gap-1">
                <button className="px-6 py-2.5 bg-white rounded-full text-[#7c3aed] text-sm font-bold shadow-sm">
                  All Records
                </button>
                <button className="px-6 py-2.5 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                  Design
                </button>
                <button className="px-6 py-2.5 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                  Leadership
                </button>
                <button className="px-6 py-2.5 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                  Technical
                </button>
              </div>
              <div className="pr-4 flex items-center gap-2 text-gray-500">
                <span className="text-[10px] font-bold tracking-widest uppercase">Sort By: Newest First</span>
                <ListFilter className="w-4 h-4" />
              </div>
            </div>

            {/* Certificate Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              
              {certificates.map((cert, index) => (
                <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col relative group">
                  {/* Image */}
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-[#d4ed31] text-gray-900 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        Verified
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                        ID: {cert.id}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {cert.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 leading-relaxed mb-8 flex-1">
                      {cert.description}
                    </p>
                    
                    <div className="flex items-end justify-between pt-4 border-t border-gray-50">
                      <div>
                        <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Issue Date</div>
                        <div className="text-sm font-bold text-gray-900">{cert.date}</div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-[#7c3aed] flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Share Button */}
                  {cert.showShare && (
                    <button className="absolute right-4 bottom-24 w-12 h-12 bg-[#7c3aed] text-white rounded-full shadow-lg shadow-purple-500/30 flex items-center justify-center hover:bg-[#6d28d9] transition-colors z-10">
                      <Share2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}

              {/* Claim Missing Award Card */}
              <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-transparent flex flex-col items-center justify-center p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer min-h-[400px]">
                <div className="w-12 h-12 rounded-full bg-[#7c3aed] text-white flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Claim Missing Award</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-[200px]">
                  Attended an event but don't see your certificate? Enter your invitation code here.
                </p>
                <button className="text-[#7c3aed] font-bold text-sm hover:underline">
                  Redeem Code
                </button>
              </div>

            </div>

            {/* Footer */}
            <footer className="border-t border-gray-200 pt-12 pb-8 flex flex-col md:flex-row justify-between gap-8">
              <div className="max-w-sm">
                <h4 className="text-[10px] font-bold text-gray-900 tracking-widest uppercase mb-4">Verification Node</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  All certificates listed are secured via the Curator Decentralized Ledger. Verification status is real-time and immutable.
                </p>
              </div>
              <div className="flex gap-16">
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">Resources</h4>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">API Docs</a></li>
                    <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Bulk Export</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">Legal</h4>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                    <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</a></li>
                  </ul>
                </div>
              </div>
            </footer>

          </div>

        </div>
      </div>
    </div>
  );
}
