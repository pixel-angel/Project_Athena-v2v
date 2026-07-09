"use client";
import { useState } from 'react';
import { Search } from 'lucide-react';
import { cities } from '@/constants/cities';

export default function SearchBar({ onSearch }: { onSearch: (coords: [number, number]) => void }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = cities.find(city => city.name.toLowerCase().includes(query.toLowerCase()));
    
    // Yahan [number, number] cast karne se error chala jayega
    if (found) {
      onSearch(found.coords as [number, number]);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mb-6">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 sm:text-sm shadow-sm transition-all"
        placeholder="Search any region or city..."
      />
    </form>
  );
}