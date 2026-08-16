export const getTypeColor = (type: string): string => {    const colors: Record<string, string> = {
      normal: "bg-slate-600 text-white",
      fire: "bg-orange-800 text-white",
      water: "bg-blue-600 text-white",
      electric: "bg-yellow-400 text-yellow-950",
      grass: "bg-green-700 text-white",
      ice: "bg-sky-400 text-sky-950",
      fighting: "bg-red-600 text-white",
      poison: "bg-purple-600 text-white",
      ground: "bg-amber-700 text-white",
      flying: "bg-indigo-400 text-indigo-950",
      psychic: "bg-pink-700 text-white",
      bug: "bg-lime-500 text-lime-950",
      rock: "bg-stone-600 text-white",
      ghost: "bg-purple-700 text-white",
      dragon: "bg-indigo-600 text-white",
      dark: "bg-slate-700 text-white",
      steel: "bg-slate-400 text-slate-950",
      fairy: "bg-pink-400 text-pink-950",
    };
    return colors[type] || "bg-slate-600 text-white";
};

export const getPokemonId = (url: string): number => {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : 0;
};

export const getPokemonSprite = (url: string): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(url)}.png`;
};
