# CSS to Tailwind Converter - Cassini App

A powerful, intelligent web application that converts CSS styles to Tailwind CSS classes with advanced optimization features. Built specifically for the Cassini design system and workflow.
 
## ✨ Features

### 🧠 Intelligent Conversion
- **Smart CSS Parsing**: Accurately parses complex CSS including CSS variables and multi-value properties
- **Font Comment Recognition**: Automatically converts design system font comments (e.g., `/* New/Paragraph/P3 Semibold */`) to semantic class names
- **CSS Variable Handling**: Intelligently processes CSS custom properties with fallback values

### 🎯 Advanced Optimization
- **Class Combination**: Automatically combines `pt-2 pb-2` into `py-2` for cleaner output
- **Spacing Optimization**: Merges related spacing classes for better maintainability
- **Arbitrary Value Generation**: Creates proper arbitrary values for unsupported CSS properties

### 🛠 Cassini-Specific Features
- **Custom Prefixes**: Add Cassini-specific prefixes (e.g., `cv:`) to all generated classes
- **Design System Integration**: Optimized for Cassini's design tokens and naming conventions
- **Production Ready**: Generates clean, maintainable Tailwind classes suitable for production use

### 🎨 Modern UI/UX
- **Real-time Conversion**: Instant feedback as you type
- **Copy to Clipboard**: One-click copying of generated Tailwind classes
- **Responsive Design**: Works seamlessly across all device sizes
- **Dark Code Output**: Terminal-style output for better readability

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd css-to-tailwind-converter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 💻 Usage

### Basic Conversion
1. Paste your CSS styles into the left input panel
2. View the automatically generated Tailwind classes in the right output panel
3. Click "Copy" to copy the classes to your clipboard

### Example Input:
```css
color: var(--Secondary-Blue-100, #003EE6);
/* New/Paragraph/P3 Semibold */
font-family: "Open Sans";
font-size: 0.625rem;
font-weight: 600;
line-height: 0.875rem;
display: flex;
padding: var(--XS, 0.125rem) var(--Edge, 0.375rem);
justify-content: center;
align-items: center;
gap: var(--S, 0.25rem);
border-radius: var(--S, 0.25rem);
background: var(--Blues-Lights-30, #D0DCF0);
```

### Example Output:
```
paragraph-p3-semibold text-secondary-blue-100 flex py-0.5 px-1.5 justify-center items-center gap-1 rounded bg-blues-lights-30
```

### Advanced Features

#### Custom Prefixes
Enable the "Use prefix" option and specify a custom prefix (default: `cv`) to add Cassini-specific prefixes to all classes:

```
cv:paragraph-p3-semibold cv:text-secondary-blue-100 cv:flex cv:py-0.5 cv:px-1.5
```

#### Font Comment Processing
The converter automatically recognizes Cassini design system font comments and converts them to semantic class names:

- `/* New/Paragraph/P3 Semibold */` → `paragraph-p3-semibold`
- `/* Heading/H2 Bold */` → `heading-h2-bold`

## 🏗 Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Linting**: ESLint with TypeScript support

### Project Structure
```
src/
├── components/          # React components (if any)
├── utils/
│   └── cssConverter.ts  # Core conversion logic
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

### Core Conversion Logic
The conversion engine (`src/utils/cssConverter.ts`) handles:
- CSS parsing and tokenization
- Property-to-class mapping
- CSS variable processing
- Class optimization
- Prefix application

## 🎯 Cassini Integration

This tool is specifically designed for the Cassini design system:

- **Design Token Support**: Handles Cassini's CSS variables and design tokens
- **Font System Integration**: Processes Cassini's font comment system
- **Prefix Support**: Adds `cv:` prefixes for Cassini-specific styling
- **Optimization**: Generates clean, maintainable classes following Cassini conventions

## 🛠 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 Supported CSS Properties

### Layout & Display
- `display`, `position`, `flex-direction`, `justify-content`, `align-items`
- `gap`, `row-gap`, `column-gap`

### Spacing
- `padding`, `margin` (including shorthand and individual sides)
- CSS variable support with fallback values

### Typography
- `color`, `font-size`, `font-weight`, `font-family`
- `line-height`, `letter-spacing`, `text-align`
- Font comment processing

### Visual
- `background`, `background-color`
- `border-radius`, `box-shadow`
- `width`, `height`

### CSS Variables
- Full support for `var()` syntax with fallbacks
- Intelligent color and spacing variable processing

## 🔧 Configuration

The converter supports various configuration options:

```typescript
interface ConversionOptions {
  usePrefix?: boolean;    // Enable/disable prefix
  prefix?: string;        // Custom prefix (default: 'cv')
}
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For Cassini-specific questions or issues:
- Create an issue in this repository
- Contact the Cassini design system team
- Check the Cassini documentation

---

**Built with ❤️ for the Cassini Design System**
