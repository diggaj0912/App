import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Users, Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (form.email && form.password && form.fullName) {
      navigate("/community");
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8f9fa]">
      <div className="flex-1 flex">
        {/* Left Panel - Branding/Visual */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#4c38a1] via-[#3b2d82] to-[#1e1b4b] overflow-hidden items-center justify-center p-16">
          {/* Abstract Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[#7c3aed]/20 blur-[120px]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#38bdf8]/10 blur-[100px]"></div>
            {/* Simulated Waves */}
            <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,50 C30,20 70,80 100,50 L100,100 L0,100 Z" fill="url(#grad1)" />
              <path d="M0,70 C40,100 60,10 100,70 L100,100 L0,100 Z" fill="url(#grad2)" opacity="0.5" />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 w-full max-w-xl">
            <h1 className="text-5xl font-bold text-white tracking-tight mb-6">
              The Digital Curator
            </h1>
            <p className="text-lg text-indigo-100/80 leading-relaxed mb-16 max-w-md">
              Crafting high-end community experiences through intentional design and sophisticated editorial management.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <Sparkles className="w-6 h-6 text-white mb-4" />
                <h3 className="text-white font-bold mb-2">Smart Curation</h3>
                <p className="text-indigo-100/70 text-sm">AI-driven event insights.</p>
              </div>
              {/* Card 2 */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <Users className="w-6 h-6 text-white mb-4" />
                <h3 className="text-white font-bold mb-2">Deep Analytics</h3>
                <p className="text-indigo-100/70 text-sm">Member engagement flows.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-[#f8f9fa] relative">
          <div className="w-full max-w-md">
            
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
              <p className="text-gray-600">Start building your community today.</p>
            </div>

            <div className="space-y-4 mb-8">
              <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
              <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                <svg className="w-5 h-5 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
                Continue with Discord
              </button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                <span className="px-4 bg-[#f8f9fa] text-gray-400">Or register with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-900 tracking-widest uppercase">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full bg-[#f1f3f5] border-2 border-transparent focus:border-indigo-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 rounded-xl py-3 px-4 text-sm text-gray-900 transition-all outline-none placeholder:text-gray-400"
                  placeholder="Evelyn Harper"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-900 tracking-widest uppercase">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-[#f1f3f5] border-2 border-transparent focus:border-indigo-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 rounded-xl py-3 px-4 text-sm text-gray-900 transition-all outline-none placeholder:text-gray-400"
                  placeholder="evelyn@curator.io"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-900 tracking-widest uppercase">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full bg-[#f1f3f5] border-2 border-transparent focus:border-indigo-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 rounded-xl py-3 pl-4 pr-11 text-sm text-gray-900 transition-all outline-none placeholder:text-gray-400"
                    placeholder="••••••••"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Must be at least 8 characters with a mix of letters and symbols.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#5a67d8] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#4c51bf] transition-all shadow-lg shadow-indigo-500/30 mt-8"
              >
                Create account
              </button>
            </form>

            <p className="text-sm text-gray-600 mt-8 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-[#2563eb] font-bold hover:underline">
                Log In
              </Link>
            </p>

            <div className="mt-16 text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed max-w-xs mx-auto">
                By signing up, you agree to our<br/>Terms of Service & Privacy Policy
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="h-20 bg-[#f8f9fa] border-t border-gray-200 flex items-center justify-between px-8 text-sm text-gray-500 shrink-0">
        <div>
          © 2024 The Digital Curator. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Help Center</a>
        </div>
      </footer>
    </div>
  );
}
