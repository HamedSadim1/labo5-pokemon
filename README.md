# 🎮 Pokémon Explorer

![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn/ui)

## A clean, modern Pokémon discovery app built with React, Tailwind CSS and shadcn/ui

[🌐 Live Demo](https://labo5-pokemon.vercel.app/) • [🐛 Report Bug](https://github.com/HamedSadim1/labo5-pokemon/issues)

---

## ✨ Features

### 🔍 Pokémon Discovery

- **Browse & search**: grid view over the full Pokédex with a debounced, client-side name search
- **Pagination**: ellipsis-style page window and an items-per-page selector
- **Detail modal**: types, abilities, base stats, height/weight and artwork, with loading, error and retry states plus a "No image" sprite fallback

### ❤️ Favorites

- Toggle favorites from any card, with a live counter in the header
- Dedicated **Favorites** tab
- Persisted in `localStorage` and kept in sync across browser tabs

### 🌗 Dark Mode

- Light/dark toggle persisted in `localStorage`
- `color-scheme` keeps native scrollbars and form controls in sync with the theme

### ♿ Accessible & Responsive

- Responsive grid (1–4 columns) and scrollable modal on small screens
- Accessible labels, keyboard focus, WCAG-AA type-badge contrast, skip-to-content link, reduced-motion support and an error boundary

### 🧱 Robust State & UX

- Skeleton loading and reusable empty/error states
- Shared favorites via React context, abortable detail fetches (no race conditions) and request timeouts

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** (CSS-first config) + **shadcn/ui** (Radix UI) + **tw-animate-css**
- **lucide-react** (icons), **sonner** (toasts), **class-variance-authority** + **clsx** + **tailwind-merge**
- **axios** + **PokéAPI**
- **ESLint** (flat config with type-aware rules), **Husky**, **lint-staged**, **commitlint**

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm

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

3. **(Optional) Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   See [Environment Variables](#environment-variables) below.

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser** at [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build       # optimized production build
npm run preview     # preview the production build locally
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

## 🔧 Environment Variables

The API and sprite URLs are configurable via `.env` (copy `.env.example`):

| Variable | Default | Description |
| --- | --- | --- |
| `VITE_POKE_API_URL` | `https://pokeapi.co/api/v2` | Base URL for the PokéAPI |
| `VITE_SPRITE_BASE_URL` | `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon` | Base URL for sprite images |

---

## ✅ Code Quality

### Git Hooks (Husky)

- **pre-commit** — runs `lint-staged`, fixing lint issues on staged `*.{ts,tsx}` files
- **commit-msg** — runs `commitlint` to enforce [Conventional Commits](https://www.conventionalcommits.org/)

### Pull Request Checks

A GitHub Actions workflow (`.github/workflows/pr.yml`) runs on every pull request and push to `main`:

- **Typecheck** — `npm run typecheck`
- **Lint** — `npm run lint`
- **Build** — `npm run build`

---

## 📖 Usage

### Browsing & searching

- Use the **All Pokémon** tab to browse the full dex
- Search by name — results filter as you type (debounced)
- Navigate pages with the pagination controls and adjust items per page

### Viewing details

- Click any card to open the detail modal
- See types, abilities, base stats, height/weight and artwork
- Close with the ✕ button, `Esc`, or by clicking outside

### Managing favorites

- Click the heart on any card to add/remove a favorite
- Switch to the **Favorites** tab to view only favorites
- Favorites persist and sync across tabs

### Dark mode

- Toggle light/dark with the moon/sun button; the preference is saved

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── ui/                   # shadcn/ui primitives (button, dialog, select, …)
│   ├── pokemon/              # Pokémon feature components
│   │   ├── Pokemon.tsx       # Main orchestrator (filter + pagination)
│   │   ├── PokemonGrid.tsx   # Responsive card grid
│   │   ├── PokemonCard.tsx   # Individual card + favorite toggle
│   │   ├── PokemonModal.tsx  # Detail dialog
│   │   ├── PokemonSkeleton.tsx   # Skeleton loading grid
│   │   ├── PokemonResultCount.tsx# "Showing X–Y of N" line
│   │   └── PokemonEmptyState.tsx # Tab-aware empty state
│   └── common/               # Shared UI components
│       ├── Header.tsx        # Tabs + theme toggle
│       ├── SearchBar.tsx     # Search + items-per-page selector
│       ├── Pagination.tsx    # Page navigation
│       ├── EmptyState.tsx    # Reusable empty placeholder
│       ├── ErrorState.tsx    # Reusable error + retry
│       ├── ErrorBoundary.tsx # Render-error fallback
│       └── SpritePlaceholder.tsx # "No image" placeholder
├── hooks/
│   ├── usePokemonList.ts     # List fetching + loading/error/retry
│   ├── usePokemonDetail.ts   # Detail fetch + modal state + abort
│   ├── useDebouncedValue.ts  # Generic debounce
│   ├── useFavorites.tsx      # Favorites context provider
│   ├── useDarkMode.ts        # Theme management
│   └── useLocalStorage.ts    # Persisted state hook
├── lib/
│   └── utils.ts              # cn() (clsx + tailwind-merge)
├── Services/
│   └── PokemonInterface.ts   # API types
├── utils/
│   ├── axios.ts              # isTimeout()
│   ├── guards.ts             # Runtime type guards
│   ├── pagination.ts         # getVisiblePages()
│   ├── pokemonUtils.ts       # Name/number/type/sprite helpers
│   └── storage.ts            # parseStoredValue()
├── config.ts                 # Env-configurable URLs
├── constants.ts              # App constants + UI copy (SSOT)
├── App.tsx
├── index.tsx
├── index.css                 # Tailwind v4 theme + base styles
└── vite-env.d.ts
```

---

## 🔧 Configuration

- **Tailwind CSS v4** is configured CSS-first in `src/index.css` (no `tailwind.config.js`) — theme tokens and dark mode are defined via CSS variables.
- The `@` path alias maps to `src/` (configured in `vite.config.ts` and `tsconfig.json`).
- TypeScript runs in `strict` mode with a modern `es2022` target and `bundler` module resolution.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit with a conventional message: `git commit -m 'feat: add amazing feature'`
4. Push the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Before committing, run `npm run lint` and `npm run typecheck`. Commit messages must follow Conventional Commits (enforced by commitlint).

---

## 🙏 Acknowledgments

- **PokéAPI** for the Pokémon data
- **shadcn/ui** and **Radix UI** for the component primitives
- **Tailwind CSS** for the utility-first styling
- **Vite** for the build tooling

---

## 📞 Contact

Hamed Sadim

- GitHub: [@HamedSadim1](https://github.com/HamedSadim1)
- Project Link: [https://github.com/HamedSadim1/labo5-pokemon](https://github.com/HamedSadim1/labo5-pokemon)

---

Made with ❤️ and lots of ☕

⭐ Star this repo if you found it helpful!
