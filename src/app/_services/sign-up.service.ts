import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SiteConfig } from '../_models/site-config';
@Injectable()

export class SignUpService {
    constructor (private http: Http, private siteConfig: SiteConfig){}

    public create (formInputs): Observable <any> {
        let headers = new Headers({ 
          'Client-Name': 'Android',
          'Content-Type': 'application/json'
         });
        let options = new RequestOptions({headers:headers});
        let url = this.siteConfig.siteUrl+'/api/user/signup';
        return this.http.post(url,formInputs,options)
                        .map(this.extractData)
                        .catch(this.handleErrorObservable);
    }

    private extractData(res: Response) {
      let body = <any>res.json(); //console.log(body);
      return body;
    }

    private handleErrorObservable (error: Response | any) {
      console.error(error.message || error);
      return Observable.throw(error.message || error);
    }
}