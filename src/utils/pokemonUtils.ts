export const getTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    normal: "bg-slate-500",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    electric: "bg-yellow-500",
    grass: "bg-green-500",
    ice: "bg-sky-400",
    fighting: "bg-red-600",
    poison: "bg-purple-500",
    ground: "bg-amber-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-600",
    rock: "bg-amber-700",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-600",
    dark: "bg-slate-700",
    steel: "bg-slate-400",
    fairy: "bg-pink-400",
  };
  return colors[type] || "bg-slate-500";
};

export const getPokemonId = (url: string): number => {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
};

export const getPokemonSprite = (url: string): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(url)}.png`;
};
