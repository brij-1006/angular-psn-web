import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Otp } from '../_models/otp';
import { SiteConfig } from '../_models/site-config';
@Injectable()
export class GlobalService {

  constructor (private http: Http, private siteConfig: SiteConfig) { }

  public getSiteConfiguration (queryString): Observable <any> {
    let headers = new Headers({ 'Client-Name': 'Android','Content-Type': 'application/json' });
    let options = new RequestOptions({headers:headers});
    let url = this.siteConfig.siteUrl+'/api/translationwithoutlogin?'+queryString;
    return this.http.get(url,options)
                    .map(this.extractData)
                    .catch(this.handleErrorObservable);
  }

  public resendEmailOtp (otp: Otp)
  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers:headers});
    let url = this.siteConfig.siteUrl+'/api/otp';
    return this.http.post(url,otp,options)
                    .map(this.extractData)
                    .catch(this.handleErrorObservable);
  }

  public getIpAddress()
  {
    return this.http.get('https://jsonip.com/')
                    .map(this.extractData)
                    .catch(this.handleErrorObservable);
  }

  public verifyEmailOtp(otp: any)
  {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers:headers});
    let url = this.siteConfig.siteUrl+'/api/otpconfirmation';
    return this.http.post(url,otp,options)
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
