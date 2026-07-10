import { Map, Bot, PencilLine, LayoutDashboard, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-pink-100 bg-[#FFF5F2] shadow-sm">
      <div className="max-w-7xl mx-auto h-20 px-8 relative flex items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-4xl font-bold text-violet-700"
        >
          <Sparkles size={30} />
          HerMap
        </Link>

        {/* Center Links */}
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-10 font-medium text-gray-700">
          <Link
            href="/map"
            className="flex items-center gap-2 hover:text-violet-700 transition"
          >
            <Map size={20} />
            Explore Map
          </Link>

          <Link
            href="/assistant"
            className="flex items-center gap-2 hover:text-violet-700 transition"
          >
            <Bot size={20} />
            Ask Our Bot
          </Link>

          <Link
            href="/review"
            className="flex items-center gap-2 hover:text-violet-700 transition"
          >
            <PencilLine size={20} />
            Fill a Review
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:text-violet-700 transition"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
