import { Component, OnInit, Input } from '@angular/core';
import { Pokedex } from 'src/app/classes/pokedex';
import { PokedexService } from 'src/app/shared/pokedex.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  @Input() currentPokemon: Pokedex;
  @Input() currentId: number;
  @Input() minLevel: number;
  @Input() maxLevel: number;

  constructor(private pokedexService: PokedexService) { }

  ngOnInit() {
    console.log(this.currentId);
    if (this.currentPokemon == null) {
      this.pokedexService.getPokedexEntry(this.currentId).subscribe(
        resp => this.currentPokemon = resp
      );
    }
  }

}
