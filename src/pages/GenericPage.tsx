import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function GenericPage() {
  const location = useLocation();
  const path = location.pathname.replace("/", "").replace("-", " ");
  const title = path
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") || "Page";

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans">
      <header className="h-16 bg-white border-b border-gray-100 flex items-center px-6 sticky top-0 z-20">
        <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium text-sm">Back to Home</span>
        </Link>
      </header>
      
      <main className="flex-1 max-w-4xl w-full mx-auto p-8 md:p-16 flex flex-col justify-center items-center text-center">
        <div className="w-20 h-20 bg-purple-100 text-[#7c3aed] flex items-center justify-center rounded-2xl mb-8 shadow-inner">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">{title}</h1>
        <p className="text-gray-500 text-lg max-w-lg mx-auto">
          This page is currently under construction. Check back soon for updates to our {title.toLowerCase()} section.
        </p>
      </main>
    </div>
  );
}
