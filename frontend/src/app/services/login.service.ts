import { Injectable } from '@angular/core';
import { LoginComponent} from '../login/login.component';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: LoginComponent
})
export class LoginService {

  constructor(private http: HttpClient) {
    
  }
}
