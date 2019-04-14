import { ViewChild, ElementRef, AfterViewChecked, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Otp } from '../_models/otp';
import { GlobalService } from '../_services/global.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
declare var jQuery: any;

@Component({
    selector: "<otp-form>",
    templateUrl: "./registration-otp.html",
    providers: [],
    styleUrls: [
                    "../../assets/css/normalize.css"
                ]
})

export class RegistrationOtpComponent implements OnInit, AfterViewChecked {
    private id: string;
    private otp: Otp = {
       ip_address: "",
       lang: "en",
       mode: 3,
       profile_id: "",
       user_id: ""
    };
    private otpRes: any;
    @ViewChild('countdown') 
    private countdown: ElementRef;

    constructor (
                    private location: Location,
                    private gs: GlobalService,
                    private activatedRoute: ActivatedRoute
                ){}

    ngOnInit () 
    {
        this.gs.getIpAddress()
        .subscribe(res => { this.otp.ip_address = res.ip; });
        // get userId and profileId string
        this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });
        //console.log(this.id.split('|'));
        let idArr = this.id.split('|');
        this.otp.user_id = idArr[0];
        this.otp.profile_id = idArr[1];
    }

    ngAfterViewChecked ()
    {
        jQuery(document).ready(function () {
            // var myDate = new Date();
            // myDate.setDate(myDate.getDate() + 2);
            // jQuery(this.countdown).countdown(myDate, function (event) {
            //     jQuery(this).html(
            //         event.strftime(
            //             '<div class="timer-wrapper"><div class="time">%M</div><span class="text">mins</span></div><div class="timer-wrapper"><div class="time">%S</div><span class="text">sec</span></div>'
            //         )
            //     );
            // });
            //alert();
        });

        jQuery(document).ready(function () {
            var myDate = new Date();
            // myDate.setDate(myDate.getDate() + 2);
            // jQuery("#countdown2").countdown(myDate, function (event) {
            //     jQuery(this).html(
            //         event.strftime(
            //             '<div class="timer-wrapper"><div class="time">%M</div><span class="text">mins</span></div><div class="timer-wrapper"><div class="time">%S</div><span class="text">sec</span></div>'
            //         )
            //     );
            // });
            //alert();
        });
    }

    public goBack ()
    {
        this.location.back();
    }

    public resendEmailOtp ()
    {
        this.gs.resendEmailOtp(this.otp).subscribe(res => {
            this.otpRes = res;
        });
    }

    public verifyEmailOtp (otpValue: string)
    { 
        if(otpValue.length == 6){
            //alert("Are O Brijwa");
            let otpObj = {
                otp:otpValue,
                lang:"en"
            };
            this.gs.verifyEmailOtp(otpObj).subscribe(res => {
                if (res.success == true) {
                    
                }
            });
        }
    }
}