import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../classes/pokemon';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private pokeUrl = this.urlServ.getUrl() + '/pokemon';

  constructor(private urlServ: UrlService, private http: HttpClient) { }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get(this.pokeUrl + '/' + id, {withCredentials: true}).pipe(
      map(resp => resp as Pokemon)
    );
  }

  getPokemonByOwnerId(id: number): Observable<Pokemon[]> {
    return this.http.get(this.pokeUrl + '/owners/' + id, {withCredentials: true}).pipe(
      map(resp => resp as Pokemon[])
    );
  }

  getEncounter(id: number): Observable<Pokemon> {
    return this.http.get(this.pokeUrl + '/encounter/' + id, {withCredentials: true}).pipe(
      map(resp => resp as Pokemon)
    );
  }

  updatePokemon(id: number): Observable<Pokemon> {
    return this.http.post(this.pokeUrl + '/' + id, {headers: this.headers, withCredentials: true}).pipe(
      map(resp => resp as Pokemon)
    );
  }

  catchPokemon(p: Pokemon): Observable<Pokemon> {
    const body = JSON.stringify(p);
    return this.http.put(this.pokeUrl, body, {headers: this.headers, withCredentials: true}).pipe(
      map(resp => resp as Pokemon)
    );
  }

  // :(
  releasePokemon(id: number): Observable<Pokemon> {
    return this.http.delete(this.pokeUrl + '/' + id).pipe(
      map(resp => resp as Pokemon)
    );
  }
}
