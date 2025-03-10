import React from 'react';
import { motion } from 'framer-motion';
import { DietaryPreference } from '../types';
import { Leaf, Brain, Wheat } from 'lucide-react';

interface DietaryFilterProps {
  selected: DietaryPreference;
  onChange: (preference: DietaryPreference) => void;
}

export const DietaryFilter: React.FC<DietaryFilterProps> = ({ selected, onChange }) => {
  const filters: { value: DietaryPreference; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All', icon: null },
    { value: 'vegan', label: 'Vegan', icon: <Leaf size={18} /> },
    { value: 'keto', label: 'Keto', icon: <Brain size={18} /> },
    { value: 'gluten-free', label: 'Gluten Free', icon: <Wheat size={18} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 flex-wrap justify-center px-4"
    >
      {filters.map(({ value, label, icon }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200
            ${selected === value
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 scale-105'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm hover:shadow-md'
            }`}
        >
          {icon}
          {label}
        </button>
      ))}
    </motion.div>
  );
};