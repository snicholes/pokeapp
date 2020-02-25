import { Pokedex } from './pokedex';
import { Person } from './person';

export class Pokemon {
    id: number;
    nickname: string;
    lvl: number;
    hp: number;
    maxHp: number;
    shiny: number;
    expPts: number;
    pokedex: Pokedex;
    owner: Person;
}
