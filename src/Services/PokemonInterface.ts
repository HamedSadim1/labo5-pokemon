export interface IPokemon {
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  base_experience: number;
  sprites: {
    front_default: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
      } | null;
    };
  };
  types: {
    type: {
      name: string;
    };
  }[] | null;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[] | null;
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[] | null;
  height: number;
  weight: number;
}
