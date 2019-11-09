import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from "./services/login.service";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxCalendarModule } from 'igniteui-angular';
import { MonthpickerComponent } from './monthpicker/monthpicker.component';
import { EventCreationModalComponent } from './event-creation-modal/event-creation-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import {ToastrService} from "ngx-toastr";
import {ToastrModule} from "ngx-toastr";
import { ViewEventModalComponent } from './view-event-modal/view-event-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MonthpickerComponent,
    EventCreationModalComponent,
    ViewEventModalComponent,
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    AgGridModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IgxCalendarModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
      
  ],
  providers: [
    LoginService,
    ToastrService,
      
  ],
  bootstrap: [AppComponent],
  entryComponents: [EventCreationModalComponent, ViewEventModalComponent]
})
export class AppModule {
}
