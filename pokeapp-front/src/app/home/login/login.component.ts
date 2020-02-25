import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/shared/person.service';
import { Person } from 'src/app/classes/person';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentPerson: Person;
  username: string;
  passwd: string;

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit() {
    this.username = '';
    this.passwd = '';
    setTimeout(() => {
      this.personService.login(null, null).subscribe(
        resp => {
          this.currentPerson = resp;
        });
    });
    // setTimeout(() => { this.currentPerson = this.personService.getPerson(); });
  }

  login() {
    this.personService.login(this.username, this.passwd).subscribe(
      resp => {
        this.currentPerson = resp;
      },
      error => {
        alert('Incorrect username or password.');
        this.currentPerson = new Person();
      }
    );
    this.router.navigate(['home']);
  }

  logout() {
    this.personService.logout().subscribe(
      resp => {
        this.currentPerson = null;
        this.username = null;
        this.passwd = null;
      }
    );
  }

  isPerson() {
    return this.personService.isPerson();
  }

}
