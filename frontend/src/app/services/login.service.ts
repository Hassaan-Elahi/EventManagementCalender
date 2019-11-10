import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {getEntryPointInfo} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }
  
  login(data: any)
  {
  	
  	return this.http
	    .post(environment.baseUrl + 'login',  data)
	    .toPromise()
  }
}
