"use client";

import { useState } from 'react';

const tabs = ['Overall', 'Lighting', 'Toilets', 'Transport', 'Sanitary', 'Childcare'];

export default function FilterTabs({ onFilterChange }: { onFilterChange: (filter: string) => void }) {
  const [activeTab, setActiveTab] = useState('Overall');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onFilterChange(tab);
  };

  return (
    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === tab 
              ? 'bg-purple-600 text-white shadow-md' 
              : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}