import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {pathToFileURL} from "url";
import {EventComponent} from "./event/event.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {SharedEventComponent} from "./shared-event/shared-event.component";
import {LoggedInGuardService} from "./services/logged-in-guard.service";


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,

  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate : [LoggedInGuardService],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'event',
        component: EventComponent

      },
      {
        path: 'reset',
        component: ResetPasswordComponent

      },
      {
        path: 'shared',
        component: SharedEventComponent

      }
    ]
  },


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
