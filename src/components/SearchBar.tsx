import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="relative max-w-2xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a food product..."
          className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-gray-200 dark:border-gray-700 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400
                   transition-all duration-200 text-lg"
        />
        <Search 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
          size={24} 
        />
      </div>
    </motion.form>
  );
};