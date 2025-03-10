# The Food Report 🥗

A modern, responsive web application that provides detailed nutrition information and health insights for food products. Built with React, TypeScript, and Tailwind CSS, it offers real-time nutritional data through the OpenFoodFacts API.

![The Food Report Banner](https://i.imgur.com/Upehnet.png)

## 🔗 Demo
https://foodreport.netlify.app/

## ✨ Features

### Core Functionality
- 🔍 Real-time food product search using the OpenFoodFacts API
- 📊 Detailed nutrition facts display (calories, proteins, carbs, fats, etc.)
- 🏆 Smart health score calculation based on nutritional guidelines
- 🖼️ Product images when available
- 📱 Fully responsive design for all devices

### Dietary Preferences
- 🌱 Vegan filter
- 🥑 Keto diet support
- 🌾 Gluten-free options
- ⚠️ Allergen warnings

### User Experience
- 🌓 Dark/Light mode toggle
- ⚡ Smooth animations using Framer Motion
- 💨 Fast loading and responsive UI
- 🎨 Modern, clean design with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0 or higher
- npm 7.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AYMAN5029/The-Food-Report.git
   cd The-Food-Report
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 📝 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # React components
│   ├── SearchBar.tsx   # Search input component
│   ├── NutritionLabel.tsx  # Nutrition facts display
│   └── DietaryFilter.tsx   # Dietary preference filters
├── hooks/              # Custom React hooks
│   └── useTheme.ts    # Dark/light mode management
├── types/             # TypeScript type definitions
├── App.tsx            # Main application component
└── main.tsx          # Application entry point
```

## 🌐 API Integration

This project uses the [OpenFoodFacts API](https://world.openfoodfacts.org/data) to fetch nutrition information.

### Key Endpoints

- Product Search: `https://world.openfoodfacts.org/cgi/search.pl`
  - Parameters:
    - `search_terms`: Product name or barcode
    - `json`: Set to true for JSON response
    - `page_size`: Number of results to return

### Response Example

```json
{
  "products": [{
    "product_name": "Example Product",
    "nutriments": {
      "energy_100g": 250,
      "proteins_100g": 10,
      "carbohydrates_100g": 30,
      "fat_100g": 8
    }
  }]
}
```

## 🧮 Health Score Calculation

The health score (0-10) is calculated based on these factors:
- Protein content (≥10g/100g: +2 points)
- Fiber content (≥3g/100g: +2 points)
- Sugar content (<10g/100g: +2 points)
- Fat content (<15g/100g: +2 points)
- Sodium content (<0.4g/100g: +2 points)

## Screenshots

![Nutella](https://i.imgur.com/ZEFeOKB.png)

![Granola Bar](https://i.imgur.com/JxhLSsR.png)

![Prime](https://i.imgur.com/9iaBzze.png)

![Feastables](https://i.imgur.com/DOPvOZ3.png)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

- Follow the existing code style
- Add comments for complex logic
- Update documentation for significant changes
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenFoodFacts](https://world.openfoodfacts.org/) for providing the nutrition data API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide React](https://lucide.dev/) for beautiful icons

## 📧 Contact

For questions or feedback, please open an issue in the GitHub repository.
