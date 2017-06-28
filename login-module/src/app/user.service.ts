import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { loginUser } from './shared/loginUser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  private isUserLoggedIn;
  private _url: string = "assets/userData.json";
  constructor(private _http: Http) { 
    this.isUserLoggedIn = false;
  }

  getUsers() {
    return this._http.get(this._url).map((response: Response) => response.json());
  }

  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }
}
