import { Component, OnInit } from '@angular/core';
import { PersonService } from '../shared/person.service';
import { Person } from '../classes/person';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentPerson: Person;
  passwd1: string;
  passwd2: string;
  displayName: string;
  success: boolean;
  changingPassword: boolean;
  changingDisplay: boolean;

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit() {
    if (!this.personService.isPerson()) {
      this.router.navigate(['home']);
    }
    setTimeout(() => {
      this.personService.login(null, null).subscribe(
        resp => {
          this.currentPerson = resp;
          console.log(this.currentPerson);
        });
    });
    this.passwd1 = '';
    this.passwd2 = '';
    this.success = false;
    this.changingPassword = false;
    this.changingDisplay = false;
  }

  toggleChangingPassword() {
    this.changingPassword = !this.changingPassword;
    this.changingDisplay = false;
    this.success = false;
  }

  toggleChangingDisplay() {
    this.changingDisplay = !this.changingDisplay;
    this.changingPassword = false;
    this.success = false;
  }

  changePassword() {
    if (this.passwd1 === this.passwd2) {
      if (this.passwd1.length >= 4) {
        this.personService.changePassword(this.passwd1).subscribe(
          resp => {
            this.success = true;
            this.changingPassword = false;
            this.passwd1 = '';
            this.passwd2 = '';
            this.currentPerson = resp;
          },
          error => {
            window.alert('Something went wrong. Try again.');
          }
        );
      } else {
        window.alert('Password must be at least 4 characters. Try again.');
        this.passwd1 = '';
        this.passwd2 = '';
      }
    } else {
      window.alert('Passwords entered did not match. Try again.');
      this.passwd1 = '';
      this.passwd2 = '';
    }
  }

  changeDisplayName() {
    if (this.displayName) {
      this.personService.changeDisplayName(this.displayName).subscribe(
        resp => {
          this.success = true;
          this.changingDisplay = false;
          this.currentPerson = resp;
        },
        error => {
          window.alert('Something went wrong. Try again.');
        }
      );
    } else {
      if (window.confirm('Are you sure you want to get rid of your display name?')) {
        this.personService.changeDisplayName('').subscribe(
          resp => {
            this.success = true;
            this.changingDisplay = false;
            this.currentPerson = resp;
          },
          error => {
            window.alert('Something went wrong. Try again.');
          }
        );
      }
    }
  }

}
