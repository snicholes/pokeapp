import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Person } from '../classes/person';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private encHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  private regHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private person: Person;
  private personURL = this.urlServ.getUrl() + '/person';

  constructor(private urlServ: UrlService, private http: HttpClient) { }

  login(username: string, password: string): Observable<Person> {
    if (username && password) {
      const body = `user=${username}&pass=${password}`;
      return this.http.post(this.personURL, body, {headers: this.encHeaders, withCredentials: true}).pipe(
        map(resp => {
          const p: Person = resp as Person;
          if (p) {
            this.person = p;
          }
          console.log(p);
          return p;
        })
      );
    } else {
      return this.http.get(this.personURL, {withCredentials: true}).pipe(
        map(resp => {
          const p: Person = resp as Person;
          if (p) {
            this.person = p;
          }
          return p;
        })
      );
    }
  }

  logout(): Observable<object> {
    return this.http.delete(this.personURL).pipe(
      map(success => {
        this.person = null;
        return success;
      })
    );
  }

  register(p: Person): Observable<Person> {
    p.money = 0;
    const body = JSON.stringify(p);
    return this.http.post(this.personURL + '/new', body, {headers: this.regHeaders, withCredentials: true}).pipe(
      map(resp => {
        this.person = resp as Person;
        return this.person;
      })
    );
  }

  changePassword(pass: string): Observable<Person> {
    const body = `pass=${pass}`;
    return this.http.put(this.personURL + '/pass', body, {headers: this.encHeaders, withCredentials: true}).pipe(
      map(resp => resp as Person)
    );
  }

  changeDisplayName(disp: string): Observable<Person> {
    this.person.displayName = disp;
    const body = JSON.stringify(this.person);
    return this.http.put(this.personURL + '/disp', body, {headers: this.regHeaders, withCredentials: true}).pipe(
      map(resp => {
        this.person = resp as Person;
        return this.person;
      })
    );
  }

  getPerson(): Person {
    return this.person;
  }

  isPerson(): boolean {
    return (this.person !== undefined && this.person !== null);
  }

  getPersonById(id): Observable<Person> {
    let p = new Person();
    return this.http.get(this.regHeaders + '/' + id, {withCredentials: true}).pipe(
      map(resp => {
        p = resp as Person;
        return p;
      })
    );
  }
}
