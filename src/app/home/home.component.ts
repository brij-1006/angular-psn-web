import { Component, OnInit} from '@angular/core';
@Component({
  selector: '<home>',
  templateUrl: './home.component.html',
  styleUrls: ["../../assets/css/style.css"] 
})

export class HomeComponent {
    title: String = "We are in home page";
}