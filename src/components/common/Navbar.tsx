import { Map, Bot, PencilLine, LayoutDashboard, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-[#f3e5f5] sticky top-0 z-999 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-20 px-8 relative flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-4xl font-bold text-violet-700 flex items-center gap-2">
          <Sparkles size={30} />
          HerMap
        </Link>

        {/* Center Links */}
        <div className="flex gap-10 font-medium text-gray-700">
          <Link className="flex items-center gap-2 hover:text-violet-700 transition" href="/map">
            <Map size={20} />
            Explore Map
          </Link>

          <Link href="/assistant" className="flex items-center gap-2 hover:text-violet-700 transition">
            <Bot size={20} />
            Ask Our Bot
          </Link>

          <Link href="/review" className="flex items-center gap-2 hover:text-violet-700 transition">
            <PencilLine size={20} />
            Fill a Review
          </Link>

          <Link href="/dashboard" className="flex items-center gap-2 hover:text-violet-700 transition">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}     