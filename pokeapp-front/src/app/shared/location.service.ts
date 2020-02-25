import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { Location } from '../classes/location';
import { map } from 'rxjs/operators';
import { LocationPokedex } from '../classes/locationpokedex';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private locationUrl = this.urlServ.getUrl() + '/location';

  constructor(private urlServ: UrlService, private http: HttpClient) { }

  getLocation(id: number): Observable<Location> {
    return this.http.get(this.locationUrl + '/' + id, {withCredentials: true}).pipe(
      map(resp => resp as Location)
    );
  }

  updateLocation(location: Location): Observable<Location> {
    const body = JSON.stringify(location);
    return this.http.put(this.locationUrl, body, {headers: this.headers, withCredentials: true}).pipe(
      map(resp => resp as Location)
    );
  }
}
