import { Component, OnInit, OnChanges } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from 'src/app/classes/person';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {
  public currentPerson: Person;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.personService.login(null, null).subscribe(
      resp => {
        this.currentPerson = resp;
      }
    );
  }

  ngOnChanges() {
    this.currentPerson = this.personService.getPerson();
  }

  isPerson(): boolean {
    return this.personService.isPerson();
  }

}
