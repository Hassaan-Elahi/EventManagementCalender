import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {buildServePath} from '@angular-devkit/build-angular/src/dev-server';
import {CalenderComponent} from './calender/calender.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
