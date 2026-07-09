import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="relative w-full max-w-2xl mb-6">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 sm:text-sm shadow-sm transition-all"
        placeholder="Search any region or city..."
      />
    </div>
  );
}