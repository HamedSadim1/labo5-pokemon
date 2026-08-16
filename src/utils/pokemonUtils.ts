import { SPRITE_BASE_URL } from "@/config";
import { DEX_NUMBER_WIDTH } from "@/constants";

export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

const DEFAULT_TYPE_COLOR = "bg-slate-600 text-white";

const typeColors: Record<PokemonType, string> = {
  normal: DEFAULT_TYPE_COLOR,
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

const isPokemonType = (value: string): value is PokemonType =>
  value in typeColors;

export const getTypeColor = (type: string): string =>
  isPokemonType(type) ? typeColors[type] : DEFAULT_TYPE_COLOR;

export const formatPokemonName = (name: string): string =>
  name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

export const formatDexNumber = (id: number): string =>
  `#${String(id).padStart(DEX_NUMBER_WIDTH, "0")}`;

export const getPokemonId = (url: string): number | null => {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
};

export const getPokemonSprite = (id: number): string =>
  `${SPRITE_BASE_URL}/${id}.png`;
