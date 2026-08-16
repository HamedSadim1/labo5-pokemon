import Pokemon from "./components/Pokemon";
import { Toaster } from "@/components/ui/sonner";

/**
 * Main App component that renders the Pokémon Explorer application.
 */
function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto w-full max-w-6xl px-4 py-5">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Pokémon Explorer
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Discover and explore the world of Pokémon
          </p>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <Pokemon />
      </main>
      <Toaster />
    </div>
  );
}

export default App;
