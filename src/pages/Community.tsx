import { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {
  Search, Bell, Settings, Image as ImageIcon, Paperclip, Calendar as CalendarIcon,
  Heart, MessageSquare, Share, Bookmark, Users, HelpCircle,
  Award, Folder, Plus, ArrowRight, LogOut
} from "lucide-react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Community() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
      {/* Top Navigation */}
      <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-12">
          <span className="text-xl font-bold tracking-tight">Curator Hub</span>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/community" className="text-[#7c3aed] font-semibold text-sm border-b-2 border-[#7c3aed] py-5">
              Explore
            </Link>
            <Link to="/network" className="text-gray-500 hover:text-gray-900 text-sm py-5 transition-colors">
              Network
            </Link>
            <Link to="/event" className="text-gray-500 hover:text-gray-900 text-sm py-5 transition-colors">
              Events
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center bg-[#f8f9fa] rounded-full px-4 py-2 w-72">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search collective..."
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-[#7c3aed] overflow-hidden">
              <img src="https://i.pravatar.cc/150?img=32" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 bg-[#f8f9fa] flex-col justify-between hidden md:flex shrink-0">
          <div className="p-6">
            {/* Collective Info */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#7c3aed] flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-gray-900 tracking-widest uppercase leading-tight">Global<br/>Collective</h2>
                <p className="text-[10px] font-bold text-[#7c3aed]">Premium Tier</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1 mb-8">
              <Link to="/community" className="flex items-center gap-3 px-4 py-3 bg-white text-[#7c3aed] rounded-xl shadow-sm font-medium text-sm">
                <Users className="w-5 h-5" /> Feed
              </Link>
              <Link to="/event" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-white hover:shadow-sm rounded-xl transition-all font-medium text-sm">
                <CalendarIcon className="w-5 h-5" /> Events
              </Link>
              <Link to="/certificates" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-white hover:shadow-sm rounded-xl transition-all font-medium text-sm">
                <Award className="w-5 h-5" /> Certificates
              </Link>
              <Link to="/network" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-white hover:shadow-sm rounded-xl transition-all font-medium text-sm">
                <Users className="w-5 h-5" /> Members
              </Link>
              <Link to="/resources" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-white hover:shadow-sm rounded-xl transition-all font-medium text-sm">
                <Folder className="w-5 h-5" /> Resources
              </Link>
            </nav>

            <button className="w-full bg-[#7c3aed] text-white py-3 rounded-xl font-medium text-sm hover:bg-[#6d28d9] transition-colors shadow-md shadow-purple-500/20">
              Create Post
            </button>
          </div>

          <div className="p-6">
            <button className="flex items-center gap-3 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium mb-4">
              <HelpCircle className="w-5 h-5" /> Help Center
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 text-red-500 hover:text-red-600 transition-colors text-sm font-medium"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </aside>

        {/* Main Feed Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 flex justify-center">
          <div className="w-full max-w-[1000px] flex flex-col lg:flex-row gap-8">
            
            {/* Feed Column */}
            <div className="flex-1 space-y-6">
              
              {/* Create Post Input */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-4">
                  <img src="https://i.pravatar.cc/150?img=32" alt="User" className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="flex-1">
                    <div className="bg-[#f8f9fa] rounded-2xl p-4 mb-4 min-h-[80px]">
                      <input type="text" placeholder="Share your latest insight or a community update..." className="bg-transparent w-full outline-none text-sm placeholder:text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"><ImageIcon className="w-5 h-5" /></button>
                        <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"><Paperclip className="w-5 h-5" /></button>
                        <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"><CalendarIcon className="w-5 h-5" /></button>
                      </div>
                      <button className="bg-[#7c3aed] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#6d28d9] transition-colors">
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post 1 */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/150?img=11" alt="Marcus Sterling" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Marcus Sterling</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Curator • 2h ago</span>
                        <span className="bg-[#d4ed31] text-gray-900 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Member</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <span className="text-xl leading-none">•••</span>
                  </button>
                </div>

                <p className="text-gray-800 text-sm leading-relaxed mb-4">
                  Just finished the keynote for the <span className="text-[#7c3aed]">#DesignForward24</span> summit. The focus on human-centric AI is shifting from a trend to a fundamental pillar of modern UX. Thrilled to share the full recording soon!
                </p>

                <div className="rounded-2xl overflow-hidden mb-4 bg-gray-100 h-72">
                  <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop" alt="Conference Stage" className="w-full h-full object-cover" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                      <Heart className="w-4 h-4 fill-current text-gray-700" />
                      <span className="text-sm font-medium">124</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                      <MessageSquare className="w-4 h-4 fill-current text-gray-700" />
                      <span className="text-sm font-medium">18</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                      <Share className="w-4 h-4" />
                      <span className="text-sm font-medium">Share</span>
                    </button>
                  </div>
                  <button className="text-gray-400 hover:text-gray-900 transition-colors">
                    <Bookmark className="w-5 h-5 fill-current text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Post 2 */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-[#7c3aed]">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Global Collective Announcements</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Official • 5h ago</span>
                        <span className="text-[#7c3aed] text-[8px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d4ed31]"></span> Live Now
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-800 text-sm leading-relaxed mb-4">
                  Our weekly community sync is starting now in the "Main Lounge" voice channel. Join us for a first look at the Q3 Roadmap and the new Curator Tools.
                </p>

                <div className="bg-[#f8f9fa] rounded-2xl p-4 flex items-center justify-between mb-4 border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <img src="https://i.pravatar.cc/150?img=44" alt="User" className="w-8 h-8 rounded-full border-2 border-[#f8f9fa] object-cover" />
                      <img src="https://i.pravatar.cc/150?img=33" alt="User" className="w-8 h-8 rounded-full border-2 border-[#f8f9fa] object-cover" />
                      <div className="w-8 h-8 rounded-full border-2 border-[#f8f9fa] bg-purple-100 flex items-center justify-center text-[10px] font-bold text-[#7c3aed]">+42</div>
                    </div>
                    <span className="text-sm text-gray-600">Members are already in the lounge</span>
                  </div>
                  <button className="bg-purple-100 text-[#7c3aed] px-4 py-2 rounded-lg text-xs font-bold tracking-wider hover:bg-purple-200 transition-colors">
                    JOIN SESSION
                  </button>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                    <Heart className="w-4 h-4 fill-current text-gray-700" />
                    <span className="text-sm font-medium">56</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                    <MessageSquare className="w-4 h-4 fill-current text-gray-700" />
                    <span className="text-sm font-medium">12</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:w-80 space-y-6">
              
              {/* Curated for You */}
              <div className="bg-[#f8f9fa] rounded-3xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Curated for You</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-[10px] font-bold text-[#7c3aed] tracking-widest uppercase mb-1">Resources</div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">The 2024 Remote Culture Report</h4>
                    <p className="text-xs text-gray-500">Downloadable PDF • 42MB</p>
                  </div>
                  
                  <div className="w-full h-px bg-gray-200"></div>

                  <div>
                    <div className="text-[10px] font-bold text-[#7c3aed] tracking-widest uppercase mb-1">Trends</div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">Micro-Communities on the Rise</h4>
                    <p className="text-xs text-gray-500">Written by Sarah Jenkins • 5 min read</p>
                  </div>

                  <div className="w-full h-px bg-gray-200"></div>

                  <div>
                    <div className="text-[10px] font-bold text-[#7c3aed] tracking-widest uppercase mb-1">Job Board</div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">Head of Product @ DesignLabs</h4>
                    <p className="text-xs text-gray-500">Berlin / Remote • Posted 1d ago</p>
                  </div>
                </div>

                <button className="w-full mt-6 bg-[#7c3aed] text-white py-3 rounded-xl text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#6d28d9] transition-colors">
                  View All Resources <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Active Members */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Active Members</h3>
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <img src="https://i.pravatar.cc/150?img=12" alt="Member" className="w-10 h-10 rounded-full object-cover" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#d4ed31] border-2 border-white rounded-full"></div>
                  </div>
                  <div className="relative">
                    <img src="https://i.pravatar.cc/150?img=5" alt="Member" className="w-10 h-10 rounded-full object-cover" />
                  </div>
                  <div className="relative">
                    <img src="https://i.pravatar.cc/150?img=8" alt="Member" className="w-10 h-10 rounded-full object-cover" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#d4ed31] border-2 border-white rounded-full"></div>
                  </div>
                  <div className="relative">
                    <img src="https://i.pravatar.cc/150?img=9" alt="Member" className="w-10 h-10 rounded-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-[#7c3aed]">
                    +12
                  </div>
                </div>
                <button className="w-full py-2.5 rounded-xl border border-purple-200 text-[#7c3aed] text-xs font-bold tracking-widest uppercase hover:bg-purple-50 transition-colors">
                  See Full Network
                </button>
              </div>

              {/* Footer Links */}
              <div className="flex flex-col gap-4 px-2 pt-4">
                <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                  <a href="#" className="hover:text-gray-600">PRIVACY</a>
                  <a href="#" className="hover:text-gray-600">TERMS</a>
                  <a href="#" className="hover:text-gray-600">COOKIES</a>
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                  © 2024 CURATOR HUB
                </p>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
