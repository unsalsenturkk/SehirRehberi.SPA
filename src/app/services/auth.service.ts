import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpclient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) { }
  path = "http://localhost:63528/api/auths/";
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  TOKEN_KEY = "token";

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json")
    this.httpclient.post(this.path + "login", loginUser, { headers: headers }).subscribe((data: any) => {
      this.saveToken(data['value'])
      this.userToken = data['value'];
      this.decodedToken = this.jwtHelper.decodeToken(data['value'])
      this.alertifyService.success("Sisteme giriş yapıldı")
      this.router.navigateByUrl('/city')
    });
  }

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json")
    this.httpclient.post(this.path + "register", registerUser, { headers: headers }).subscribe((data: any) => { 

    });

  }


  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token)
    
  }

  logOut(){
    localStorage.removeItem(this.TOKEN_KEY)
    this.alertifyService.error("Sistemden çıkış yapıldı")
    this.router.navigateByUrl('/city')

  }

  loggedIn(){
    return !this.jwtHelper.isTokenExpired(this.userToken)
  }

  get token(){
    return localStorage.getItem(this.TOKEN_KEY)?.toString()
  }

  getCurrentUserId(){
    return this.jwtHelper.decodeToken(this.token).nameid
  }
}
