import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { SiteConfig } from '../_models/site-config';
@Injectable()
export class AuthenticationService {
    public token: string;
    public expires_in: number;
    constructor(private http: Http, private siteConfig: SiteConfig) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(email: string, password: string): Observable<boolean> {
        let headers    = new Headers({ 'Client-Name': 'Android','Content-Type': 'application/json' }); // ... Set content type to JSON
        let options    = new RequestOptions({ headers: headers }); // Create a request option
        let apiUrl = this.siteConfig.siteUrl+'/api/user/login';
        return this.http.post(apiUrl, JSON.stringify({ username: email, password: password }), options)
            .map((response: Response) => {
                console.log(response.json());
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().access_token;
                let expires_in = response.json() && response.json().expires_in;
                if (token) {
                    // set token property
                    this.token = token;
                    this.expires_in = expires_in;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({expires_in: expires_in, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}