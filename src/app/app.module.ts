import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './_gaurds/auth.gaurd';
import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { SiteConfig } from './_models/site-config';
import { GlobalService } from './_services/global.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MdInputModule,MdNativeDateModule,MdDatepickerModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdNativeDateModule,
    MdDatepickerModule,
    AppRoutingModule
  ],
  providers: [GlobalService,AuthGuard,SiteConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
