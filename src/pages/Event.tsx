import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Bell,
  Calendar,
  MapPin,
  Award,
  Users,
  Video,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Event() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const user = localStorage.getItem("user");
        if (user) {
          const res = await fetch(`https://app-production-2003.up.railway.app/events/${user}`);
          const data = await res.json();
          setEvents(data);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };
    
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24 font-sans text-gray-900">
      {/* Navbar */}
      <nav className="bg-white px-6 h-16 flex items-center justify-between sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold tracking-tight">
            Curator
          </Link>
          <div className="hidden md:flex gap-6">
            <Link to="/community" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Communities
            </Link>
            <Link to="/event" className="text-sm text-purple-600 font-medium transition-colors">
              Events
            </Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Certificates
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search events..."
              className="bg-transparent border-none focus:outline-none text-sm text-gray-700 w-48 placeholder:text-gray-400"
            />
          </div>
          <button onClick={() => alert("Notifications")} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-all">
            <Bell className="w-5 h-5" />
          </button>
          <Link to="/login" className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200 hover:ring-2 hover:ring-indigo-500 transition-all">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8lsF7EjahYQvzMul7Z0r2GeyQlpvZCf_SR0R8foON7kwsJ8aoAFX45_94TM2TJrADixtJ18B419bxaDIu9C_4mMh8ugDCgXjqXpZQCDsRDZ3JnCBahEvuEzaGTZ7ckPYZfePRYbZ1IWadAzmtycVkuKblaW6F9YdMYAKzAeOjJz_OPYIqeuzcNKrc3a_UkSOu4BH9YJPcW1DH_F3NI6NHW00gUKR8zobwV4_ujqHOytWIa67JG2YTIK6fxWc4L19xZ63OiJCh131o"
              alt="Login / Signup"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-[400px] rounded-[2rem] overflow-hidden relative mb-12 bg-gradient-to-br from-[#2a4d54] to-[#1e293b] flex flex-col justify-end p-10"
        >
          {/* Background decorative text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-80 pointer-events-none">
            <div className="text-center">
              <div className="text-white/80 text-4xl md:text-5xl font-light tracking-widest mb-2">Modern <span className="font-bold">UI/UX</span></div>
              <div className="text-white/90 text-5xl md:text-7xl font-bold tracking-[0.2em]">WORKSHOP</div>
            </div>
          </div>
          
          <div className="relative z-10">
            <span className="inline-block px-4 py-1.5 bg-[#d4ed31] text-gray-900 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              Workshop
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Modern UI/UX Workshop
            </h1>
            <div className="flex items-center gap-2 text-white/90 text-sm md:text-base font-medium">
              <Calendar className="w-4 h-4" />
              <span>Oct 24, 2026 • 10:00 AM EST</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About this Event</h2>
            <div className="text-gray-600 leading-relaxed space-y-4 text-lg">
              <p>
                Dive deep into the evolving landscape of digital product design. This workshop isn't just about pixels; it's about systems, psychology, and the emerging "Digital Curator" aesthetic. Join us for a full day of intensive learning where we dismantle traditional SaaS UI patterns and rebuild them for the modern editorial web.
              </p>
              <p>
                We'll explore the 'No-Line' rule, tonal layering, and how to use uncomfortable white space to create premium experiences that breathe. Whether you're a seasoned lead or an aspiring designer, this workshop will challenge your perspective on hierarchy and depth.
              </p>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* WhatsApp Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Community Hub</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                  Connect with fellow designers and speakers before the workshop starts.
                </p>
                <button 
                  onClick={() => window.open("https://chat.whatsapp.com/xyz", "_blank")}
                  className="w-full bg-[#25D366] text-white hover:bg-[#20bd5a] py-3.5 rounded-xl font-semibold transition-colors"
                >
                  Join WhatsApp Group
                </button>
              </div>

              {/* Meeting Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-[#e8eddf] text-[#5a6b31] flex items-center justify-center mb-6">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Virtual Stage</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                  The main livestream and interactive workshop rooms are held here.
                </p>
                <button 
                  onClick={() => window.open("https://meet.jit.si/your-event", "_blank")}
                  className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 py-3.5 rounded-xl font-semibold transition-colors"
                >
                  Join Meeting
                </button>
              </div>
            </div>

            {/* Attendees */}
            <div className="mt-16">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Attendees (124)</h3>
                <button onClick={() => alert("Viewing all attendees...")} className="text-purple-600 font-medium text-sm hover:underline">View all</button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPRpXCcjUcWsjus0s93OWH04XBwErzEWPU6RnF_x6S_Bvrk86P6vRNRwE7dqmTkWb-0BC0LIQDASSKxugicVZ7hsGVNGitdRiBrnPm3aoE5mhOdjGWVRI9mWJXrLT7MOii8bgBYt-1ddTmw5biaTIqeSCU-kGOmH5pacMripYn9koYqNmi-8ZMvogLP1dZZbJOJAv0oR73s62jX47ULZKkyN77TkUaRyXwk9pRC6DAoXem4gMPLs8XvbFMy_J4XDRxxkgf8pss8O8-" alt="Avatar" className="w-12 h-12 rounded-full border-2 border-[#f8f9fa] object-cover" />
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhoBYo6_E99LSlc2KRDC_4dto6huzN77Q2Z2Bcd2KiBUaE65vNnKSa9sbcPpupQaP8eQuYzCOoMcBPy2lyOitI9tO-w2zhdaavyd60qYotpBQnzfua2z1gAGM4N38udBzTRLG4btoNYEWMDLyUfpcvb7NTTWlswCRvnGWlnU39IPezQESQ994aL7J3KY7JxDdlsusZLAfvKWEKGU_U_0Mcetes9xJYTqFADGUpjuR3MQbH3IyY2Uwp8BIFjuFWi9aYT_l0IM9mTj_7" alt="Avatar" className="w-12 h-12 rounded-full border-2 border-[#f8f9fa] object-cover" />
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg-FLDCi1ZFjZnZRfq4HJd7X2jdBiCG9cG2l-fT2iQlCtRxQ4nPYvQQwvWAl-yDVcqGf3bjYUfkXIc6NW_-VHvYYlJA4q8l91clBIzr3JuSzssQsT5QWHN2GIj9opjglPJjKOmb6ZaYBjpLlDP9LSMePx3-hXqLIurKP9mwD3LWJArXaH6n6tUcQbOWN04k3RNVv5sBThiTtAaZNbT4H1s3vJ8oqkmyl7B1JXKh6x4gaWSn7J526FGcCIrgmHcZk4a4ZJ21yySVMnV" alt="Avatar" className="w-12 h-12 rounded-full border-2 border-[#f8f9fa] object-cover" />
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8lsF7EjahYQvzMul7Z0r2GeyQlpvZCf_SR0R8foON7kwsJ8aoAFX45_94TM2TJrADixtJ18B419bxaDIu9C_4mMh8ugDCgXjqXpZQCDsRDZ3JnCBahEvuEzaGTZ7ckPYZfePRYbZ1IWadAzmtycVkuKblaW6F9YdMYAKzAeOjJz_OPYIqeuzcNKrc3a_UkSOu4BH9YJPcW1DH_F3NI6NHW00gUKR8zobwV4_ujqHOytWIa67JG2YTIK6fxWc4L19xZ63OiJCh131o" alt="Avatar" className="w-12 h-12 rounded-full border-2 border-[#f8f9fa] object-cover" />
                </div>
                <div className="bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2 rounded-full">
                  +120 Designers joined
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            {/* Price Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">Price</span>
                <span className="bg-[#d4ed31] text-gray-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Live</span>
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-8">$49.00</div>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Virtual Event</div>
                    <div className="text-gray-500 text-xs mt-1">Access from anywhere via Zoom</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Certificate Included</div>
                    <div className="text-gray-500 text-xs mt-1">Verifiable PDF upon completion</div>
                  </div>
                </div>
              </div>

              <button onClick={() => alert("Successfully registered for the event!")} className="w-full bg-[#7c3aed] text-white hover:bg-[#6d28d9] py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-purple-500/30">
                Register
              </button>

              <button 
                onClick={() => alert("Your certificate will be available for download after the event.")}
                className="w-full mt-4 py-3 text-gray-600 hover:text-gray-900 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Certificate
              </button>
            </div>

            {/* Host Card */}
            <div className="bg-gray-100/80 rounded-[2rem] p-6 mt-6 flex items-center gap-4">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhoBYo6_E99LSlc2KRDC_4dto6huzN77Q2Z2Bcd2KiBUaE65vNnKSa9sbcPpupQaP8eQuYzCOoMcBPy2lyOitI9tO-w2zhdaavyd60qYotpBQnzfua2z1gAGM4N38udBzTRLG4btoNYEWMDLyUfpcvb7NTTWlswCRvnGWlnU39IPezQESQ994aL7J3KY7JxDdlsusZLAfvKWEKGU_U_0Mcetes9xJYTqFADGUpjuR3MQbH3IyY2Uwp8BIFjuFWi9aYT_l0IM9mTj_7" 
                alt="Host Avatar" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">Hosted By</div>
                <div className="font-bold text-gray-900 text-sm">Alex Rivero</div>
                <div className="text-gray-500 text-xs mt-0.5">Design Lead @ Curator</div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Render Fetched Events */}
        {events.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Created Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Event
                    </span>
                    <span className="text-xs text-gray-500 font-medium">ID: {event.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                    <Users className="w-4 h-4" />
                    <span>Owner: {event.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
