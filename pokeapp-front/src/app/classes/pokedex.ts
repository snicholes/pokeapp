import { Type } from './type';
import { LocationPokedex } from './locationpokedex';

export class Pokedex {
    pokedexId: number;
    name: string;
    types: Type[];
    locations: LocationPokedex[];
}
