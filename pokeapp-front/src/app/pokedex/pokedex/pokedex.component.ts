import { Component, OnInit } from '@angular/core';
import { PokedexService } from 'src/app/shared/pokedex.service';
import { Pokedex } from 'src/app/classes/pokedex';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  pokedex: Pokedex[];

  constructor(private pokedexService: PokedexService) { }

  ngOnInit() {
    this.pokedexService.getPokedex().subscribe(
      resp => {
        this.pokedex = resp;
      }
    );
  }

}
