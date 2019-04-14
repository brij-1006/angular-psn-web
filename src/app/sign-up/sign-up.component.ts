import { ViewChild, ElementRef, AfterViewChecked, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GlobalService } from '../_services/global.service';
import { Observable } from 'rxjs';
import { SignUpService } from '../_services/sign-up.service';
import {MdDatepickerModule} from '@angular/material';
import { UserSignUp } from '../_models/user-sign-up';
declare var jQuery: any;
@Component({
    selector: "sign-up-form",
    templateUrl: "./sign-up.component.html",
    providers:[SignUpService],
    styleUrls: ["../../assets/css/normalize.css"] 
})

export class SignUpComponent implements OnInit, AfterViewChecked{
    private model: UserSignUp;
    private view : any = {};
    @ViewChild('dob') 
    private eleDob: ElementRef;
    constructor (   private gs: GlobalService, 
                    private signUpService: SignUpService,
                    private router: Router,
                    private location: Location
                ) {}

    public ngOnInit () {
        let queryString = "q=audience-user-registration&lang=en";
        this.getSiteConfiguration(queryString);
        // initializing forms elements here
        this.model = {
            first_name            : 'parveen',
            last_name             : 'yadav',
            email                 : 'abc11@gmail.com',
            mobile                : 9999107006,
            password              : '12345678',
            password_confirmation : '12345678',
            dob                   : new Date(),
            gender                : 'Male',
            location              : 'Gurgaon',
            lang                  : 'en' 
        };

    }

    public ngAfterViewChecked () {
        //console.log(this.eleDob);
        if(this.eleDob !== undefined)
        {
            jQuery(this.eleDob.nativeElement).datetimepicker({
            language:  'en',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
        });
        }
    }

    public getSiteConfiguration(queryString: String) {
        this.gs.getSiteConfiguration(queryString)
                .subscribe(res => {
                    this.view = res.data[0];
                    //console.log(res);
                });
    }

    public signUp() {
       // console.log(this.model);
       this.signUpService.create(this.model)
            .subscribe(res => {
                if (res.success === true)
                {
                    let userProfileId = res.data._id+"|"+res.data.profile_id;
                    this.router.navigate(['/agree/'+userProfileId]);
                }
                //console.log(res.data);
            });
    }

}