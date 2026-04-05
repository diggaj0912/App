import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mail, Lock, Github } from "lucide-react";
import { auth } from "../firebase";
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (form.email && form.password) {
      try {
        const res = await fetch("https://app-production-2003.up.railway.app/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password }),
        });
        const data = await res.json();
        
        if (data.message === "Login success") {
          localStorage.setItem("user", form.email);
          navigate("/community");
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred during login");
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await fetch("https://app-production-2003.up.railway.app/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        }),
      });

      localStorage.setItem("user", JSON.stringify(user));
      alert("Google Login Success 🚀");
      navigate("/community");
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/popup-closed-by-user') {
        return; // User closed the popup, ignore
      }
      alert("Google Login Failed");
    }
  };

  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await fetch("https://app-production-2003.up.railway.app/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        }),
      });

      localStorage.setItem("user", JSON.stringify(user));
      alert("GitHub Login Success 🚀");
      navigate("/community");
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/popup-closed-by-user') {
        return; // User closed the popup, ignore
      }
      alert("GitHub Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-white">
      {/* Left Panel - Branding/Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0f172a] overflow-hidden items-center justify-center">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#7c3aed]/20 blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#38bdf8]/10 blur-[120px]"></div>
        </div>

        <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full max-w-2xl">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-5 h-5 border-2 border-t-[#38bdf8] border-r-[#818cf8] border-b-[#f472b6] border-l-[#fb923c] rounded-full"></div>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Curator Hub</span>
            </div>
          </div>

          <div>
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              The premier network for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818cf8] to-[#c084fc]">elite creators</span> and engineers.
            </h1>
            <p className="text-lg text-slate-400 max-w-md leading-relaxed mb-12">
              Join thousands of professionals sharing insights, attending exclusive events, and building the future of the web.
            </p>

            {/* Testimonial */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-4">
                <img src="https://i.pravatar.cc/150?img=32" alt="Sarah Jenkins" className="w-12 h-12 rounded-full border-2 border-white/20" />
                <div>
                  <div className="text-white font-bold text-sm">Sarah Jenkins</div>
                  <div className="text-slate-400 text-xs">Head of Product @ DesignLabs</div>
                </div>
              </div>
              <p className="text-slate-300 text-sm italic leading-relaxed">
                "Curator Hub has completely transformed how I connect with other product leaders. The quality of discussions here is unmatched."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-md">
          
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-5 h-5 border-2 border-t-[#38bdf8] border-r-[#818cf8] border-b-[#f472b6] border-l-[#fb923c] rounded-full"></div>
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">Curator Hub</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-500">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-900">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-[#f8f9fa] border-2 border-transparent focus:border-purple-100 focus:bg-white focus:ring-4 focus:ring-purple-50 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-900 transition-all outline-none"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-900">Password</label>
                <a href="#" className="text-sm font-bold text-[#7c3aed] hover:text-[#6d28d9] transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-[#f8f9fa] border-2 border-transparent focus:border-purple-100 focus:bg-white focus:ring-4 focus:ring-purple-50 rounded-xl py-3 pl-11 pr-4 text-sm text-gray-900 transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center pt-2">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#7c3aed] focus:ring-[#7c3aed] border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#7c3aed] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#6d28d9] transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 mt-6"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 w-full bg-white border border-gray-200 rounded-xl py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button 
                type="button"
                onClick={handleGithubLogin}
                className="flex items-center justify-center gap-2 w-full bg-white border border-gray-200 rounded-xl py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Github className="w-5 h-5" />
                GitHub
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-10 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#7c3aed] font-bold hover:underline">
              Sign up for free
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
