import { LocationPokedex } from './locationpokedex';

export class Location {
    id: number;
    name: string;
    north: Location;
    east: Location;
    south: Location;
    west: Location;
    pokemon: LocationPokedex[];
}
