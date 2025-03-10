export interface NutritionData {
  product_name: string;
  image_url?: string;
  image_front_url?: string;
  image_front_small_url?: string;
  nutriments: {
    energy_100g: number;
    proteins_100g: number;
    carbohydrates_100g: number;
    fat_100g: number;
    fiber_100g: number;
    sodium_100g: number;
    sugars_100g: number;
  };
  ingredients_analysis_tags?: string[];
  allergens_tags?: string[];
  labels?: string[];
}

export type DietaryPreference = 'all' | 'vegan' | 'keto' | 'gluten-free';

export interface Theme {
  isDark: boolean;
  toggle: () => void;
}