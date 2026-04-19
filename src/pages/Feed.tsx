import { Link } from "react-router-dom";
import { 
  Bell, 
  Settings, 
  Search, 
  Image as ImageIcon, 
  Paperclip, 
  Calendar, 
  MoreHorizontal, 
  Heart, 
  MessageSquare, 
  Share, 
  Bookmark,
  ThumbsUp,
  MessageCircle,
  HelpCircle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Feed() {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans">
      
      {/* LEFT SIDEBAR */}
      <div className="w-[280px] bg-[#f8f9fa] flex flex-col fixed h-full border-r border-gray-200/60 z-10">
        <div className="p-6 flex items-center gap-3 border-b border-transparent">
          <div className="w-8 h-8 bg-[#6d28d9] rounded-xl flex items-center justify-center shadow-sm">
            <div className="w-4 h-4 border-2 border-white rounded-full"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">Curator Hub</span>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm cursor-pointer hover:border-purple-200 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-inner">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900 leading-tight uppercase tracking-wide">Global</div>
              <div className="text-xs font-bold text-gray-900 leading-tight uppercase tracking-wide">Collective</div>
              <div className="text-[10px] text-[#6d28d9] font-semibold mt-0.5">Premium Tier</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 flex flex-col gap-1 mt-2">
          <Link to="/feed" className="flex items-center gap-3 px-4 py-3 text-[#6d28d9] bg-white rounded-xl font-semibold shadow-sm border border-gray-100 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-1 before:bg-[#6d28d9] before:rounded-r-full overflow-hidden">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Feed
          </Link>
          <Link to="/event" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-black/5 rounded-xl font-medium transition-colors">
            <Calendar className="w-5 h-5 opacity-70" />
            Events
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-black/5 rounded-xl font-medium transition-colors">
            <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Certificates
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-black/5 rounded-xl font-medium transition-colors">
            <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Members
          </Link>
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-black/5 rounded-xl font-medium transition-colors">
            <svg className="w-5 h-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            Resources
          </Link>
          
          <div className="mt-8 px-4">
            <Button className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl py-6 shadow-md shadow-purple-500/20 font-semibold transition-all hover:-translate-y-0.5">
              Create Post
            </Button>
          </div>
        </nav>

        <div className="p-4 mt-auto">
          <Link to="#" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-black/5 rounded-xl font-medium transition-colors">
            <HelpCircle className="w-5 h-5 opacity-70" />
            Help Center
          </Link>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex-1 ml-[280px]">
        {/* TOP NAVBAR */}
        <header className="h-16 px-8 flex items-center justify-between border-b border-gray-200/60 bg-[#f8f9fa]/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex gap-8">
            <Link to="/feed" className="text-sm font-semibold text-[#6d28d9] border-b-2 border-[#6d28d9] h-16 flex items-center pt-0.5 relative top-[1px]">Explore</Link>
            <Link to="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 h-16 flex items-center transition-colors">Network</Link>
            <Link to="/event" className="text-sm font-medium text-gray-500 hover:text-gray-900 h-16 flex items-center transition-colors">Events</Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search collective..." 
                className="w-64 pl-10 bg-gray-100 border-transparent focus-visible:ring-[#7c3aed] focus-visible:bg-white rounded-full h-9 text-sm"
              />
            </div>
            <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#f8f9fa]"></span>
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <Avatar className="w-9 h-9 ring-2 ring-[#7c3aed] ring-offset-2 ring-offset-[#f8f9fa] cursor-pointer">
              <AvatarImage src="https://i.pravatar.cc/150?img=47" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* FEED & RIGHT SIDEBAR WRAPPER */}
        <div className="flex max-w-6xl mx-auto p-8 gap-8">
          
          {/* CENTER FEED */}
          <div className="flex-1 max-w-2xl min-w-0 flex flex-col gap-6">
            
            {/* CREATE POST INPUT */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 ring-2 ring-white shadow-sm mt-1">
                  <AvatarImage src="https://i.pravatar.cc/150?img=47" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea 
                    placeholder="Share your latest insight or a community update..." 
                    className="min-h-[80px] text-base resize-none bg-gray-50/50 border-none focus-visible:ring-0 px-4 py-3 rounded-2xl placeholder:text-gray-400"
                  />
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-1">
                      <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                        <ImageIcon className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                        <Calendar className="w-5 h-5" />
                      </button>
                    </div>
                    <Button className="bg-[#7c3aed] hover:bg-[#6d28d9] rounded-full px-6 font-semibold shadow-sm">
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* FEED POST 1 */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="https://i.pravatar.cc/150?img=11" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight">Marcus Sterling</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <p className="text-sm text-gray-500">Curator · 2h ago</p>
                      <span className="bg-[#fbff00] text-[#1a1a1a] text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wide">Member</span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-700 p-1">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <p className="text-gray-800 leading-relaxed text-[15px]">
                Just finished the keynote for the <a href="#" className="text-[#6d28d9] hover:underline">#DesignForward24</a> summit. The focus on human-centric AI is shifting from a trend to a fundamental pillar of modern UX. Thrilled to share the full recording soon!
              </p>

              {/* Image */}
              <div className="rounded-2xl overflow-hidden mt-2 bg-gray-50 border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000" 
                  alt="Event Stage" 
                  className="w-full h-[300px] object-cover"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-100">
                <div className="flex gap-6">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 group transition-colors">
                    <Heart className="w-5 h-5 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
                    <span className="font-medium text-sm">124</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 group transition-colors">
                    <MessageSquare className="w-5 h-5 group-hover:fill-blue-500 group-hover:text-blue-500 transition-colors" />
                    <span className="font-medium text-sm">18</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                    <Share className="w-5 h-5" />
                    <span className="font-medium text-sm">Share</span>
                  </button>
                </div>
                <button className="text-gray-400 hover:text-gray-900 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* FEED POST 2 (Announcement) */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-[#7c3aed]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight">Global Collective Announcements</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <p className="text-sm text-gray-500">Official · 5h ago</p>
                      <span className="flex items-center gap-1 text-[#6d28d9] text-[10px] uppercase font-bold tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6d28d9] animate-pulse"></span>
                        Live Now
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-800 leading-relaxed text-[15px]">
                Our weekly community sync is starting now in the "Main Lounge" voice channel. Join us for a first look at the Q3 Roadmap and the new Curator Tools.
              </p>

              {/* Call to action box */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center justify-between mt-2">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <Avatar className="w-8 h-8 border-2 border-white">
                      <AvatarImage src="https://i.pravatar.cc/150?img=5" />
                    </Avatar>
                    <Avatar className="w-8 h-8 border-2 border-white">
                      <AvatarImage src="https://i.pravatar.cc/150?img=12" />
                    </Avatar>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-[#f3e8ff] flex items-center justify-center text-[10px] font-bold text-[#7c3aed] z-10">
                      +42
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium hidden sm:block">Members are already in the lounge</span>
                </div>
                <Button className="bg-[#e9d5ff] hover:bg-[#d8b4fe] text-[#6d28d9] font-bold shrink-0">
                  Join Session
                </Button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-6 mt-2 pt-4 border-t border-gray-100 text-gray-500">
                <button className="flex items-center gap-2 hover:text-[#6d28d9] transition-colors">
                  <ThumbsUp className="w-5 h-5" />
                  <span className="font-medium text-sm">56</span>
                </button>
                <button className="flex items-center gap-2 hover:text-[#6d28d9] transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium text-sm">12</span>
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-[300px] shrink-0 hidden lg:flex flex-col gap-6">
            
            {/* Curated for You */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6">Curated for You</h3>
              
              <div className="flex flex-col gap-5">
                <div className="group cursor-pointer">
                  <p className="text-[10px] font-bold tracking-widest text-[#7c3aed] uppercase mb-1">Resources</p>
                  <h4 className="font-semibold text-gray-900 leading-snug group-hover:text-[#6d28d9] transition-colors">The 2024 Remote Culture Report</h4>
                  <p className="text-[12px] text-gray-500 mt-1">Downloadable PDF · 42MB</p>
                </div>
                
                <div className="h-px bg-gray-100"></div>

                <div className="group cursor-pointer">
                  <p className="text-[10px] font-bold tracking-widest text-[#7c3aed] uppercase mb-1">Trends</p>
                  <h4 className="font-semibold text-gray-900 leading-snug group-hover:text-[#6d28d9] transition-colors">Micro-Communities on the Rise</h4>
                  <p className="text-[12px] text-gray-500 mt-1">Written by Sarah Jenkins · 5 min read</p>
                </div>
                
                <div className="h-px bg-gray-100"></div>

                <div className="group cursor-pointer">
                  <p className="text-[10px] font-bold tracking-widest text-[#7c3aed] uppercase mb-1">Job Board</p>
                  <h4 className="font-semibold text-gray-900 leading-snug group-hover:text-[#6d28d9] transition-colors">Head of Product @ DesignLabs</h4>
                  <p className="text-[12px] text-gray-500 mt-1">Berlin / Remote · Posted 1d ago</p>
                </div>
              </div>

              <div className="mt-6 -mx-6 -mb-6">
                <button className="w-full bg-[#6d28d9] hover:bg-[#5b21b6] text-white p-4 rounded-b-3xl font-bold text-sm tracking-wide flex items-center justify-between transition-colors">
                  VIEW ALL RESOURCES
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Members */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Active Members</h3>
              
              <div className="flex gap-2 mb-4">
                <div className="relative">
                  <Avatar className="w-10 h-10 border-2 border-white shadow-sm cursor-pointer hover:-translate-y-1 transition-transform">
                    <AvatarImage src="https://i.pravatar.cc/150?img=11" />
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="relative">
                  <Avatar className="w-10 h-10 border-2 border-white shadow-sm cursor-pointer hover:-translate-y-1 transition-transform">
                    <AvatarImage src="https://i.pravatar.cc/150?img=32" />
                  </Avatar>
                </div>
                <div className="relative">
                  <Avatar className="w-10 h-10 border-2 border-white shadow-sm cursor-pointer hover:-translate-y-1 transition-transform">
                    <AvatarImage src="https://i.pravatar.cc/150?img=33" />
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#fbff00] border-2 border-white rounded-full"></div>
                </div>
                <div className="relative">
                  <Avatar className="w-10 h-10 border-2 border-white shadow-sm cursor-pointer hover:-translate-y-1 transition-transform">
                    <AvatarImage src="https://i.pravatar.cc/150?img=44" />
                  </Avatar>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#f3e8ff] bg-[#f8f9fa] flex items-center justify-center text-xs font-bold text-[#6d28d9] cursor-pointer hover:bg-[#f3e8ff] transition-colors shrink-0">
                  +12
                </div>
              </div>

              <Button variant="outline" className="w-full border-gray-200 text-[#6d28d9] font-semibold hover:bg-gray-50 rounded-xl">
                SEE FULL NETWORK
              </Button>
            </div>

            {/* Footer Links */}
            <div className="px-2 pb-8">
              <div className="flex gap-4 text-xs font-medium text-gray-400 mb-2">
                <a href="#" className="hover:text-gray-600">PRIVACY</a>
                <a href="#" className="hover:text-gray-600">TERMS</a>
                <a href="#" className="hover:text-gray-600">COOKIES</a>
              </div>
              <p className="text-[11px] text-gray-400 block mt-2">© 2024 CURATOR HUB</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

// Inline component for missing icon
function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
