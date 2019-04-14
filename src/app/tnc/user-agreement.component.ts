import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: "<user-agreement>",
    templateUrl: "./user-agreement.html",
    styleUrls: [
                    "../../assets/css/normalize.css",
                     "../../tinyscrollbar.css"    
                ]
})
export class UserAgreementComponent implements OnInit
{
    private id: string;
    constructor (
                    private location:Location, 
                    private router:Router, 
                    private activatedRoute:ActivatedRoute
                ) { }

    ngOnInit () {
        this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    public goBack(): void {
        this.location.back();
    }

    public goToOtpPage(): void{
        this.router.navigate(["/verify-otp/"+this.id]);
    }
}