import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from "./services/login.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxCalendarModule } from 'igniteui-angular';
import { MonthpickerComponent } from './monthpicker/monthpicker.component';
import { EventCreationModalComponent } from './modals/event-creation-modal/event-creation-modal.component';
import { ModalModule } from 'ngx-bootstrap';
import {ToastrService} from "ngx-toastr";
import {ToastrModule} from "ngx-toastr";
import { EventTableComponent } from './event-table/event-table.component';
import { CookieService } from "ngx-cookie-service";
import { headerInterceptor } from "./header-interceptor";
import { SideBarComponent } from './side-bar/side-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { EventComponent } from './event/event.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ViewEventModalComponent } from './modals/view-event-modal/view-event-modal.component';
import { DeleteEventModalComponent } from './modals/delete-event-modal/delete-event-modal.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedEventComponent } from './shared-event/shared-event.component';
import { EventDetailTableComponent } from './event-detail-table/event-detail-table.component';
import {AuthService} from "./services/auth.service";
import {LoggedInGuardService} from "./services/logged-in-guard.service";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MonthpickerComponent,
    EventCreationModalComponent,
    EventTableComponent,
    SideBarComponent,
    ProfileComponent,
    EventComponent,
    ViewEventModalComponent,
    DeleteEventModalComponent,
    ResetPasswordComponent,
    SharedEventComponent,
    EventDetailTableComponent,
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
    ButtonsModule,

  ],
  providers: [
    LoginService,
    ToastrService,
    CookieService,
    AuthService,
    LoggedInGuardService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: headerInterceptor,
      multi: true
    },


  ],
  bootstrap: [AppComponent],
  entryComponents: [EventCreationModalComponent, ViewEventModalComponent, DeleteEventModalComponent]
})
export class AppModule {
}
