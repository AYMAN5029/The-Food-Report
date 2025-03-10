import React, { useState } from 'react';
import axios from 'axios';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchBar } from './components/SearchBar';
import { NutritionLabel } from './components/NutritionLabel';
import { DietaryFilter } from './components/DietaryFilter';
import { useTheme } from './hooks/useTheme';
import type { NutritionData, DietaryPreference } from './types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function App() {
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dietaryPreference, setDietaryPreference] = useState<DietaryPreference>('all');
  const theme = useTheme();

  const searchFood = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          query
        )}&json=true&page_size=1`
      );

      if (response.data.products.length === 0) {
        throw new Error('No products found');
      }

      const product = response.data.products[0];
      setNutritionData(product);
    } catch (err) {
      setError('Failed to fetch nutrition data. Please try again.');
      setNutritionData(null);
    } finally {
      setLoading(false);
    }
  };

  const filterProduct = (product: NutritionData | null): boolean => {
    if (!product || dietaryPreference === 'all') return true;

    const labels = (product.labels || '').toLowerCase();
    switch (dietaryPreference) {
      case 'vegan':
        return labels.includes('vegan');
      case 'keto':
        return product.nutriments.carbohydrates_100g < 10;
      case 'gluten-free':
        return labels.includes('gluten-free') || !product.allergens_tags?.includes('en:gluten');
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-end mb-6">
          <button
            onClick={theme.toggle}
            className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                     hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200
                     shadow-sm hover:shadow-md"
            aria-label={theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme.isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
            The Food Report
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
            Enter any food product to get detailed nutrition information and health insights
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          <SearchBar onSearch={searchFood} />
          <DietaryFilter selected={dietaryPreference} onChange={setDietaryPreference} />

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-md mx-auto px-4"
              >
                <Skeleton height={400} className="mb-4" />
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg mx-4"
              >
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </motion.div>
            )}

            {!loading && nutritionData && filterProduct(nutritionData) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex justify-center px-4"
              >
                <NutritionLabel data={nutritionData} />
              </motion.div>
            )}

            {!loading && nutritionData && !filterProduct(nutritionData) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg mx-4"
              >
                <p className="text-amber-600 dark:text-amber-400">
                  This product doesn't match your dietary preferences.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;