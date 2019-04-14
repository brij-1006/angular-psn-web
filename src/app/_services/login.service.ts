import { Injectable }    from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Login } from '../_models/login';
import { SiteConfig } from '../_models/site-config';
@Injectable()
export class LoginService {

  //private headers = new Headers({"Client-Name":"Android",'Content-Type': 'application/json','Accept': 'application/json'});
  private loginUrl = '/api/user/login';  // URL to web api

  constructor(private http: Http) { }

  public getAccessToken(): Observable<Login> {
     let headers    = new Headers({ 'Client-Name': 'Android','Content-Type': 'application/json' }); // ... Set content type to JSON
     let options    = new RequestOptions({ headers: headers }); // Create a request option
     let bodyString = JSON.stringify({"username":"clicknpick@gmail.in","password":"123456"});      
    return this.http.post(this.loginUrl, bodyString, options)
                         .map(this.extractData)
                         .catch(this.handleErrorObservable);
  }

  private extractData(res: Response) {
      let body = <Login>res.json(); //console.log(body);
      return body;
    }

  private handleErrorObservable (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.message || error);
    }
}  
