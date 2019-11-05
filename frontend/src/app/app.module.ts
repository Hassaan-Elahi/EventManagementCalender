import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalenderComponent } from './calender/calender.component';
import {AgGridAngular, AgGridModule} from 'ag-grid-angular';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginService} from "./services/login.service";
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    CalenderComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    FormsModule,
	HttpClientModule
  ],
  providers: [
  	LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
