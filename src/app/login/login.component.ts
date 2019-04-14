import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { GlobalService } from '../_services/global.service';
import { Observable } from 'rxjs';

//import { Login } from './login';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers:[AuthenticationService],
  styleUrls: ['../../assets/css/style.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  model: any = {};
  error: String = '';
  view : any = {};
  constructor (private router: Router, 
                private authenticationService: AuthenticationService,
                private gs: GlobalService) {}
    ngOnInit() {
        let queryString = "q=user-login&lang=en";
            this.view = this.getSiteConfiguration(queryString);
            // reset login status
            this.authenticationService.logout();
    }

    public getSiteConfiguration(queryString: String) {
        this.gs.getSiteConfiguration(queryString)
                .subscribe(res => {
                    this.view = res.data[0];
                    //console.log(res);
                });
    }

    public login ()
    {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/home']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }

    get structure() { return JSON.stringify(this.model); }
}
