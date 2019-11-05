import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }
  
  getHeaders()
  {
	  return new HttpHeaders({
		  'Content-Type': 'application/json',
	  });
  }
  
  login(data: any)
  {
  	
  	return this.http
	    .post('http://localhost:3000/login',  data, { headers: this.getHeaders()} )
	    .toPromise()
  }
}
