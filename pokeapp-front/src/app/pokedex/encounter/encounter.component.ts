import { Component, OnInit, Input } from '@angular/core';
import { LocationPokedex } from 'src/app/classes/locationpokedex';
import { PokedexService } from 'src/app/shared/pokedex.service';
import { Pokemon } from 'src/app/classes/pokemon';
import { PokemonService } from 'src/app/shared/pokemon.service';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.css']
})
export class EncounterComponent implements OnInit {
  @Input() locId: number;
  encounterPokemon: Pokemon;

  constructor(private pokedexService: PokedexService, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.getEncounter(this.locId).subscribe(
      resp => this.encounterPokemon = resp
    );
  }

}
