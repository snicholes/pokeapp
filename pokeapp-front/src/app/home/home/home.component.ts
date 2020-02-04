import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/shared/person.service';
import { Person } from 'src/app/classes/person';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentPerson: Person;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.currentPerson = this.personService.getPerson();
  }

}
