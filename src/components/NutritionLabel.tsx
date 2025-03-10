import React from 'react';
import { motion } from 'framer-motion';
import { NutritionData } from '../types';
import { Activity, AlertCircle, ImageOff } from 'lucide-react';

interface NutritionLabelProps {
  data: NutritionData;
}

export const NutritionLabel: React.FC<NutritionLabelProps> = ({ data }) => {
  const getHealthScore = () => {
    let score = 0;
    const n = data.nutriments;
    
    // Simple scoring based on general nutritional guidelines
    if (n.proteins_100g >= 10) score += 2;
    if (n.fiber_100g >= 3) score += 2;
    if (n.sugars_100g < 10) score += 2;
    if (n.fat_100g < 15) score += 2;
    if (n.sodium_100g < 0.4) score += 2;
    
    return Math.min(10, score);
  };

  const healthScore = getHealthScore();
  const productImage = data.image_front_url || data.image_url || data.image_front_small_url;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full"
    >
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
            {productImage ? (
              <img
                src={productImage}
                alt={data.product_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.classList.add('p-4');
                  target.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                  target.replaceWith(ImageOff({ size: 48, className: 'text-gray-400' }));
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageOff size={48} className="text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {data.product_name}
            </h2>
            <div className="flex items-center mt-2 gap-2">
              <Activity className="text-green-500" size={20} />
              <span className="text-lg font-semibold">
                Health Score: {healthScore}/10
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <NutrientRow label="Calories" value={`${data.nutriments.energy_100g} kcal`} />
        <NutrientRow label="Protein" value={`${data.nutriments.proteins_100g}g`} />
        <NutrientRow label="Carbohydrates" value={`${data.nutriments.carbohydrates_100g}g`} />
        <NutrientRow label="Fat" value={`${data.nutriments.fat_100g}g`} />
        <NutrientRow label="Fiber" value={`${data.nutriments.fiber_100g}g`} />
        <NutrientRow label="Sodium" value={`${data.nutriments.sodium_100g}g`} />
        <NutrientRow label="Sugars" value={`${data.nutriments.sugars_100g}g`} />
      </div>

      {data.allergens_tags && data.allergens_tags.length > 0 && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-red-500" size={20} />
            <h3 className="font-semibold text-red-700 dark:text-red-400">Allergens</h3>
          </div>
          <ul className="mt-2 list-disc list-inside text-red-600 dark:text-red-300">
            {data.allergens_tags.map((allergen) => (
              <li key={allergen}>{allergen.replace('en:', '')}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

const NutrientRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
    <span className="text-gray-700 dark:text-gray-300">{label}</span>
    <span className="font-semibold text-gray-900 dark:text-gray-100">{value}</span>
  </div>
);