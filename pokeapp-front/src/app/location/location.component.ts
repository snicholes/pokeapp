import { Component, OnInit, Input, AfterViewChecked, OnChanges } from '@angular/core';
import { LocationService } from '../shared/location.service';
import { PokedexService } from '../shared/pokedex.service';
import { Location } from '../classes/location';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokedex } from '../classes/pokedex';
import { LocationPokedex } from '../classes/locationpokedex';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  currentLocation: Location;
  locationPokemon: Pokedex[];
  pokedex: Pokedex[];
  chosenPokemon: LocationPokedex[];
  currentLocationPokedex: LocationPokedex;

  constructor(private locationService: LocationService, private pokedexService: PokedexService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let locationId;
    setTimeout(() => {
      this.route.params.subscribe(
        params => {
          locationId = params['id'];
        }
      );
    });
    setTimeout(() => {
      this.locationService.getLocation(locationId).subscribe(
        resp => this.currentLocation = resp
      );
    });
    this.pokedexService.getPokedex().subscribe(
      resp => this.pokedex = resp
    );
    this.currentLocationPokedex = new LocationPokedex();
    this.chosenPokemon = [];
  }

  nav(direction: string) {
    let dir = this.currentLocation.id;
    switch (direction) {
      case 'north':
        dir = this.currentLocation.north.id;
        break;
      case 'east':
        dir = this.currentLocation.east.id;
        break;
      case 'south':
        dir = this.currentLocation.south.id;
        break;
      case 'west':
        dir = this.currentLocation.west.id;
        break;
    }
    this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
      this.router.navigate(['location/' + dir]);
    });
  }

  addToChosen() {
    const dexChoice = document.getElementById('pokedex') as HTMLSelectElement;
    this.currentLocationPokedex.id = {locationId: this.currentLocation.id, pokedexId: parseInt(dexChoice.value, 10)};
    this.currentLocationPokedex.location = { id: this.currentLocation.id };
    this.currentLocationPokedex.pokedex = { id: parseInt(dexChoice.value, 10) };
    this.chosenPokemon.push(this.currentLocationPokedex);
    this.currentLocationPokedex = new LocationPokedex();
    console.log(this.chosenPokemon);
  }

  removeFromChosen(c: LocationPokedex) {
    this.chosenPokemon.splice(this.chosenPokemon.indexOf(c), 1);
  }

  updateLocation() {
    for (const c of this.chosenPokemon) {
      this.currentLocation.pokemon.push(c);
    }
    console.log(this.currentLocation);
    this.locationService.updateLocation(this.currentLocation).subscribe(
      resp => this.currentLocation = resp
    );
    this.chosenPokemon = [];
  }
}
