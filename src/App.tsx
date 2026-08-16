import Pokemon from "./components/Pokemon";
import { Toaster } from "@/components/ui/sonner";
import { CONTAINER_CLASS, TEXT } from "./constants";
import { cn } from "@/lib/utils";

/**
 * Main App component that renders the Pokémon Explorer application.
 */
function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="absolute left-4 top-4 z-50 -translate-y-96 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg focus:translate-y-0"
      >
        {TEXT.skipToContent}
      </a>
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className={cn(CONTAINER_CLASS, "px-4 py-5")}>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {TEXT.appTitle}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {TEXT.appSubtitle}
          </p>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className={cn(CONTAINER_CLASS, "px-4 py-8")}>
        <Pokemon />
      </main>
      <Toaster />
    </div>
  );
}

export default App;
