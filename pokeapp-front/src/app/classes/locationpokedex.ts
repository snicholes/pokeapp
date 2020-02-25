import { Pokedex } from './pokedex';

export class LocationPokedex {
    id: {
        locationId: number,
        pokedexId: number
    };
    location: {
        id: number;
    };
    pokedex: {
        id: number;
    };
    minLevel: number;
    maxLevel: number;
}
