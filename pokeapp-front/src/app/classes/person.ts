import { PersonItem } from './personitem';

export class Person {
    id: number;
    username: string;
    passwd: string;
    displayName: string;
    money: number;
    items: PersonItem[];
}
