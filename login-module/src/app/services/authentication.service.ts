import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private router: Router) { }

    login(email: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({ email: email, password: password }))
        .map((response: Response) => {
                let user = response.json();
                return user;
            });
    }
}