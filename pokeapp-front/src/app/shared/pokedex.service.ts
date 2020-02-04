import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { Pokedex } from '../classes/pokedex';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private pokedexURL = this.urlServ.getUrl() + '/pokedex';

  constructor(private urlServ: UrlService, private http: HttpClient ) { }

  getPokedex(): Observable<Pokedex[]> {
    return this.http.get(this.pokedexURL, {withCredentials: true}).pipe(
      map(resp => resp as Pokedex[])
    );
  }

  getPokedexEntry(id: number): Observable<Pokedex> {
    return this.http.get(this.pokedexURL + '/' + id, {withCredentials: true}).pipe(
      map(resp => resp as Pokedex)
    );
  }

  addPokedexEntry(entry: Pokedex): Observable<Pokedex> {
    const body = JSON.stringify(entry);
    return this.http.post(this.pokedexURL, body, {headers: this.headers, withCredentials: true}).pipe(
      map(resp => resp as Pokedex)
    );
  }

  updatePokedexEntry(entry: Pokedex): Observable<Pokedex> {
    const body = JSON.stringify(entry);
    return this.http.put(this.pokedexURL, body, {headers: this.headers, withCredentials: true}).pipe(
      map(resp => resp as Pokedex)
    );
  }
}
