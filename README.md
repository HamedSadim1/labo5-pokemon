# 🎮 Pokémon Explorer

![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn/ui)

## A stunning, modern Pokémon discovery app with glassmorphism design

[🌐 Live Demo](https://pokemon-explorer-demo.vercel.app) • [🐛 Report Bug](https://github.com/HamedSadim1/labo5-pokemon/issues)

---

## ✨ Features

### 🎨 **Modern Glassmorphism Design**

- Beautiful transparent glass-like UI components
- Animated gradient backgrounds with floating blobs
- Smooth hover effects and transitions
- Professional shadcn/ui components

### 🔍 **Advanced Pokémon Discovery**

- **Browse & Search**: Grid view with pagination and real-time search
- **Detailed Modals**: Professional modal dialogs with comprehensive Pokémon information
- **Favorites System**: Save and manage your favorite Pokémon
- **Dark Mode Toggle**: Seamless theme switching

### 📱 **Responsive & Accessible**

- Fully responsive design for all screen sizes
- Keyboard navigation and screen reader support
- Fast loading with optimized images
- Progressive Web App (PWA) ready

### 🚀 **Performance Optimized**

- Built with Vite for lightning-fast development
- TypeScript for type safety and better DX
- Lazy loading and code splitting
- Modern React 19 with concurrent features

---

## 🛠️ Tech Stack

### **Frontend Framework**

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Next-generation frontend tooling

### **Styling & UI**

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library built on Radix UI
- **Lucide Icons** - Beautiful icon set

### **Data & API**

- **Axios** - HTTP client for API requests
- **PokeAPI** - Official Pokémon REST API

### **Development Tools**

- **ESLint** - Code linting (flat config with type-aware TypeScript rules)
- **Husky** - Git hooks
- **lint-staged** - Lint staged files on commit
- **commitlint** - Enforce conventional commit messages

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ and npm
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/HamedSadim1/labo5-pokemon.git
   cd labo5-pokemon
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   Visit: [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on the whole project |
| `npm run typecheck` | Type-check the project with TypeScript |

---

## ✅ Code Quality

### Git Hooks (Husky)

Git hooks are set up automatically when you install dependencies:

- **pre-commit** — runs `lint-staged`, which fixes lint issues on staged files
- **commit-msg** — runs `commitlint` to enforce [Conventional Commits](https://www.conventionalcommits.org/)

### Pull Request Checks

A GitHub Actions workflow (`.github/workflows/pr.yml`) runs on every pull request and push to `main`:

- **Typecheck** — `npm run typecheck`
- **Lint** — `npm run lint`
- **Build** — `npm run build`

---

## 📖 Usage

### Browsing Pokémon

- Use the **All Pokémon** tab to browse all available Pokémon
- Navigate through pages using the pagination controls
- Adjust items per page with the dropdown selector

### Searching Pokémon

- Use the search bar to find Pokémon by name
- Search is performed in real-time as you type
- Results are filtered instantly

### Viewing Details

- Click on any Pokémon card to open the detailed modal
- View comprehensive information including stats, types, and artwork
- Use the close button or click outside to dismiss

### Managing Favorites

- Click the heart icon on any Pokémon card to add/remove from favorites
- Switch to the **Favorites** tab to view only your favorite Pokémon
- Favorites are persisted in localStorage

### Dark Mode

- Toggle between light and dark themes using the moon/sun button
- Theme preference is automatically saved

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── Header.tsx          # Navigation and theme toggle
│   ├── SearchBar.tsx       # Search and pagination controls
│   ├── PokemonCard.tsx     # Individual Pokémon cards
│   ├── PokemonGrid.tsx     # Grid layout component
│   ├── PokemonModal.tsx    # Detailed Pokémon modal
│   ├── Pagination.tsx      # Page navigation
│   └── LoadingSpinner.tsx  # Loading animation
├── hooks/
│   ├── useDarkMode.ts      # Theme management
│   ├── useFavorites.ts     # Favorites functionality
│   └── useLocalStorage.ts  # Local storage utilities
├── lib/
│   └── utils.ts            # Utility functions
├── Services/
│   └── PokemonInterface.ts # TypeScript interfaces
└── utils/
    └── pokemonUtils.ts     # Pokémon-specific utilities
```

---

## 🎨 Design System

### Color Palette

- **Primary**: Purple to blue gradient backgrounds
- **Accent**: Yellow to pink gradients for highlights
- **Glass**: Semi-transparent whites with blur effects
- **Text**: White on dark backgrounds, dark on light

### Typography

- **Font Family**: System fonts for optimal performance
- **Sizes**: Responsive scaling from mobile to desktop
- **Weights**: Medium and bold for hierarchy

### Components

- **Cards**: Glassmorphism with hover animations
- **Buttons**: Rounded with backdrop blur effects
- **Modals**: Full-screen overlays with smooth transitions
- **Inputs**: Transparent backgrounds with focus states

---

## 🔧 Configuration

### Tailwind Configuration

The project uses Tailwind CSS v4 with custom animations:

```css
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write conventional commit messages (enforced by commitlint)
- Run `npm run lint` and `npm run typecheck` before committing
- Add tests for new features
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **PokeAPI** for providing the Pokémon data
- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first styling approach
- **Vite** for the blazing fast build tool

---

## 📞 Contact

Hamed Sadim

- GitHub: [@HamedSadim1](https://github.com/HamedSadim1)
- Project Link: [https://github.com/HamedSadim1/labo5-pokemon](https://github.com/HamedSadim1/labo5-pokemon)

---

Made with ❤️ and lots of ☕

⭐ Star this repo if you found it helpful!
