export interface Trainer {
  name: string;
  surName: string;
  selectedPokemons: { name: string; url: string }[];
}
export interface Pokemon {
  name: string;
  url: string;
  sprite?: string;
}
