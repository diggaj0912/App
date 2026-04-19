import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import {
  Bell,
  Settings,
  Users,
  Calendar,
  Award,
  User,
  HelpCircle,
  LogOut,
  Calendar as CalendarIcon,
  Clock,
  Link as LinkIcon,
  MessageCircle,
  Video,
  FileCheck,
  ArrowRight,
  MapPin,
  Mic,
  FileUp,
  Users as UsersIcon
} from "lucide-react";

export default function CreateEvent() {
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

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "event", // 'event' or 'hackathon'
    meetingLink: "",
    venue: "",
    speakers: "",
    hasPptUpload: false,
    hasTeamFormation: false,
    whatsapp: true,
    meeting: true,
    certificate: false,
    sponsorship: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const generateMeetingLink = () => {
    const randomId = Math.random().toString(36).substring(2, 12);
    setForm((prev) => ({ ...prev, meetingLink: `https://meet.google.com/${randomId.slice(0,3)}-${randomId.slice(3,7)}-${randomId.slice(7)}` }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          owner: localStorage.getItem("user") || "anonymous",
          type: form.type,
          hasPptUpload: form.hasPptUpload,
          hasTeamFormation: form.hasTeamFormation,
          link: form.meetingLink,
          venue: form.venue,
          speakers: form.speakers ? form.speakers.split(",") : [],
        }),
      });
      const data = await res.json();
      console.log("Event Created:", data.event);
      alert("Event Created Successfully 🚀");
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the event");
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f8f9fa] border-r border-gray-100 flex-col justify-between hidden md:flex z-10 shrink-0">
        <div>
          {/* Nav Menu */}
          <div className="px-6 mt-8">
            <div className="mb-8">
              <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">UptoHack Pro</div>
              <div className="text-sm font-bold text-gray-900 mt-1">Elite Management</div>
            </div>

            <nav className="flex flex-col gap-2">
              <Link to="/community" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm">
                <Users className="w-5 h-5" />
                Communities
              </Link>
              <Link to="/event" className="flex items-center gap-3 px-4 py-3 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 text-[#7c3aed] rounded-xl transition-colors font-medium text-sm">
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

        <div className="p-6 space-y-2 mb-4">
          <button onClick={() => alert("Help Center opened")} className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors font-medium text-sm mt-4">
            <HelpCircle className="w-5 h-5" />
            Help
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold tracking-tight">UptoHack</span>
            <div className="hidden md:flex gap-6">
              <Link to="/community" className="text-gray-500 hover:text-gray-900 text-sm transition-all duration-300">
                Communities
              </Link>
              <Link to="/event" className="text-[#7c3aed] font-semibold text-sm transition-all duration-300">
                Events
              </Link>
              <Link to="/certificates" className="text-gray-500 hover:text-gray-900 text-sm transition-all duration-300">
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
          
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-10">
              <div className="text-[10px] font-bold text-[#7c3aed] tracking-widest uppercase mb-2">New Creation</div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                Create Event
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
                Design an experience that matters. Fill in the details below to broadcast your event to the UptoHack Pro community.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              
              {/* Left Column: Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">
                  
                  {/* Event Type Selector */}
                  <div className="mb-8">
                    <label className="block text-xs font-bold text-gray-900 tracking-widest uppercase mb-3">Event Type</label>
                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setForm({...form, type: 'event'})}
                        className={`flex-1 py-4 px-6 rounded-xl font-semibold border-2 transition-colors ${form.type === 'event' ? 'border-[#7c3aed] bg-purple-50 text-[#7c3aed]' : 'border-gray-100 bg-white text-gray-500'}`}
                      >
                        Standard Event
                      </button>
                      <button 
                        type="button"
                        onClick={() => setForm({...form, type: 'hackathon'})}
                        className={`flex-1 py-4 px-6 rounded-xl font-semibold border-2 transition-colors ${form.type === 'hackathon' ? 'border-[#7c3aed] bg-purple-50 text-[#7c3aed]' : 'border-gray-100 bg-white text-gray-500'}`}
                      >
                        Hackathon
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="mb-8">
                    <label className="block text-xs font-bold text-gray-900 tracking-widest uppercase mb-3">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full bg-[#f8f9fa] border-none rounded-xl px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#7c3aed] outline-none transition-all"
                      placeholder="E.g. Future of Generative Design Symposium"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <label className="block text-xs font-bold text-gray-900 tracking-widest uppercase mb-3">Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full bg-[#f8f9fa] border-none rounded-xl px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#7c3aed] outline-none transition-all resize-none"
                      placeholder="Share the core objective and what attendees can expect..."
                      rows={4}
                      required
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-xs font-bold text-gray-900 tracking-widest uppercase mb-3">Date</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                          <CalendarIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="date"
                          value={form.date}
                          onChange={handleChange}
                          className="w-full bg-[#f8f9fa] border-none rounded-xl pl-12 pr-5 py-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#7c3aed] outline-none transition-all"
                          placeholder="mm/dd/yyyy"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-900 tracking-widest uppercase mb-3">Time</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                          <Clock className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="time"
                          value={form.time}
                          onChange={handleChange}
                          className="w-full bg-[#f8f9fa] border-none rounded-xl pl-12 pr-5 py-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#7c3aed] outline-none transition-all"
                          placeholder="--:-- --"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                          <Clock className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Meeting Link & Venue */}
                  <div className="mb-8">
                     <label className="block text-xs font-bold text-gray-900 tracking-widest uppercase mb-3">Location / Venue</label>
                     <div className="relative mb-6">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                          <MapPin className="w-5 h-5 text-gray-400" />
                        </div>
                        <input type="text" name="venue" value={form.venue} onChange={handleChange} className="w-full bg-[#f8f9fa] border-none rounded-xl pl-12 pr-5 py-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#7c3aed] outline-none" placeholder="Physical Venue or Virtual" />
                     </div>
                     <label className="block text-xs font-bold text-gray-900 tracking-widest uppercase mb-3">Meeting Link</label>
                     <div className="flex gap-4">
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                            <LinkIcon className="w-5 h-5 text-gray-400" />
                          </div>
                          <input type="url" name="meetingLink" value={form.meetingLink} onChange={handleChange} className="w-full bg-[#f8f9fa] border-none rounded-xl pl-12 pr-5 py-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#7c3aed] outline-none" placeholder="https://..." />
                        </div>
                        <button type="button" onClick={generateMeetingLink} className="bg-indigo-50 text-[#7c3aed] px-6 font-bold rounded-xl whitespace-nowrap border border-indigo-100 hover:bg-indigo-100 transition-colors">
                           Auto-Generate
                        </button>
                     </div>
                  </div>

                  {/* Speakers Profiles */}
                  <div className="mb-10">
                     <label className="block text-xs font-bold text-gray-900 tracking-widest uppercase mb-3">Speaker Profiles</label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                          <Mic className="w-5 h-5 text-gray-400" />
                        </div>
                        <input type="text" name="speakers" value={form.speakers} onChange={handleChange} className="w-full bg-[#f8f9fa] border-none rounded-xl pl-12 pr-5 py-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#7c3aed] outline-none" placeholder="Comma separated, e.g. Sarah Jenkins, Marc Andreessen" />
                     </div>
                  </div>

                  {/* Hackathon Features */}
                  {form.type === 'hackathon' && (
                    <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 mb-10 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-blue-100 flex items-center justify-center shrink-0">
                            <FileUp className="w-6 h-6 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">PPT & Resource Upload Support</h4>
                            <p className="text-xs text-gray-500 mt-1">Allow members to upload hackathon deliverables.</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => setForm({...form, hasPptUpload: !form.hasPptUpload})} className={`w-14 h-8 rounded-full transition-colors relative ${form.hasPptUpload ? 'bg-blue-600' : 'bg-gray-200'}`}>
                          <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${form.hasPptUpload ? 'translate-x-7' : 'translate-x-1'}`}></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-blue-100 flex items-center justify-center shrink-0">
                            <UsersIcon className="w-6 h-6 text-blue-500" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">Team Formation</h4>
                            <p className="text-xs text-gray-500 mt-1">Allow users to form max 4-member teams.</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => setForm({...form, hasTeamFormation: !form.hasTeamFormation})} className={`w-14 h-8 rounded-full transition-colors relative ${form.hasTeamFormation ? 'bg-blue-600' : 'bg-gray-200'}`}>
                          <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${form.hasTeamFormation ? 'translate-x-7' : 'translate-x-1'}`}></div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Toggles */}
                  <div className="space-y-6 mb-10">
                    
                    {/* WhatsApp Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shrink-0">
                          <MessageCircle className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">Auto-create WhatsApp group</h4>
                          <p className="text-xs text-gray-500 mt-0.5">Sync attendees automatically upon registration</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setForm({...form, whatsapp: !form.whatsapp})}
                        className={`w-14 h-8 rounded-full transition-colors relative ${form.whatsapp ? 'bg-[#7c3aed]' : 'bg-gray-200'}`}
                      >
                        <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${form.whatsapp ? 'translate-x-7' : 'translate-x-1'}`}></div>
                      </button>
                    </div>

                    {/* Meeting Link Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0">
                          <Video className="w-6 h-6 text-[#7c3aed]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">Enable meeting link</h4>
                          <p className="text-xs text-gray-500 mt-0.5">Display link to confirmed attendees only</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setForm({...form, meeting: !form.meeting})}
                        className={`w-14 h-8 rounded-full transition-colors relative ${form.meeting ? 'bg-[#7c3aed]' : 'bg-gray-200'}`}
                      >
                        <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${form.meeting ? 'translate-x-7' : 'translate-x-1'}`}></div>
                      </button>
                    </div>

                    {/* Certificate Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0">
                          <FileCheck className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">Auto-generate certificates</h4>
                          <p className="text-xs text-gray-500 mt-0.5">Issue digital credentials after event completion</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setForm({...form, certificate: !form.certificate})}
                        className={`w-14 h-8 rounded-full transition-colors relative ${form.certificate ? 'bg-[#7c3aed]' : 'bg-gray-200'}`}
                      >
                        <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${form.certificate ? 'translate-x-7' : 'translate-x-1'}`}></div>
                      </button>
                    </div>

                    {/* Sponsorship Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
                          <Users className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">Seek Sponsorships</h4>
                          <p className="text-xs text-gray-500 mt-0.5">List this event in the UptoHack Sponsor directory</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setForm({...form, sponsorship: !form.sponsorship})}
                        className={`w-14 h-8 rounded-full transition-colors relative ${form.sponsorship ? 'bg-[#7c3aed]' : 'bg-gray-200'}`}
                      >
                        <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${form.sponsorship ? 'translate-x-7' : 'translate-x-1'}`}></div>
                      </button>
                    </div>

                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-[#7c3aed] text-white py-4 rounded-xl font-medium text-lg hover:bg-[#6d28d9] transition-colors shadow-lg shadow-purple-500/20"
                  >
                    {form.type === 'hackathon' ? 'Launch Hackathon' : 'Create Event'}
                  </button>

                </form>
              </div>

              {/* Right Column: Preview & Tips */}
              <div className="space-y-8">
                
                {/* Live Preview Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="h-48 bg-[#0f172a] relative p-4 flex items-start">
                    {/* Simulated stars/particles background */}
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    <span className="relative z-10 bg-[#d4ed31] text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      Live Preview
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold text-[#7c3aed] tracking-widest uppercase">Jan 24, 2024</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">10:00 AM</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {form.title || "Your Event Title Here"}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-6">
                      {form.description || "The description you write will appear here, giving potential attendees a glimpse into th..."}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">JD</div>
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">AS</div>
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-[#7c3aed] flex items-center justify-center text-[10px] font-bold text-white">+12</div>
                      </div>
                      <span className="text-[#7c3aed] text-sm font-medium flex items-center gap-1">
                        View Details <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expert Tip Card */}
                <div className="bg-purple-50/50 rounded-3xl p-8 border border-purple-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Expert Tip</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Events with descriptive titles and specific meeting links see a <span className="text-[#7c3aed] font-bold">45% higher</span> attendance rate. Don't forget to enable the certificate automation to boost post-event engagement!
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
