import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private autservice: AuthService
   ) { }

  loginUser: any = {}; 

  ngOnInit() {
  }

  login() {
    this.autservice.login(this.loginUser);
  }

  logOut() {
    this.autservice.logOut();
  }

  get isAuthenticated() {
    return this.autservice.loggedIn();
  }
}
