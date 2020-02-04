import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/shared/person.service';
import { Person } from 'src/app/classes/person';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  person: Person;
  password1: string;
  password2: string;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.person = new Person();
  }

  register() {
    if (this.password1 === this.password2) {
      this.person.passwd = this.password1;
      this.personService.register(this.person).subscribe(
        resp => { },
        error => {
          alert('Username is taken. Please try again.');
          this.person = new Person();
          return;
        }
      );
      this.personService.login(this.person.username, this.person.passwd).subscribe(
        resp => {
          this.person = resp;
        }
      );
    } else {
      alert('Passwords entered did not match.');
      this.password1 = '';
      this.password2 = '';
    }
  }

  isPerson(): boolean {
    return this.personService.isPerson();
  }
}
