import React from "react";
import Pokemon from "./components/Pokemon";

/**
 * Main App component that renders the Pokémon Explorer application.
 * It provides a gradient background with animated elements and contains the main Pokemon component.
 */
function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-5xl font-bold text-center bg-linear-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Pokémon Explorer
            </h1>
            <p className="text-white/80 text-center mt-2 text-lg">
              Discover and explore the world of Pokémon
            </p>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/20 shadow-2xl p-8">
            <Pokemon />
          </div>
        </main>
      </div>
    </div>
  );
}
<div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
  {/* Animated background elements */}
  <div className="absolute inset-0">
    <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    <div className="absolute top-0 right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
  </div>

  <div className="relative z-10">
    <header className="backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-5xl font-bold text-center bg-linear-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
          Pokémon Explorer
        </h1>
        <p className="text-white/80 text-center mt-2 text-lg">
          Discover and explore the world of Pokémon
        </p>
      </div>
    </header>
    <main className="container mx-auto px-4 py-8">
      <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/20 shadow-2xl p-8">
        <Pokemon />
      </div>
    </main>
  </div>
</div>;

export default App;
