import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }
  
  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
  
  
  public getAllEvents (month, year) {
    
    return this.http
        .get(`http://localhost:3000/events`, {params: {year: year, month: month} ,headers: this.getHeaders()} )
        .toPromise()
  }
  
  
  public createEvent (data) {
    
    return this.http
        .post(`http://localhost:3000/create-event`, data, { headers: this.getHeaders()} )
        .toPromise()
  }
  
  
  
  public getEvent (id) {
    
    return this.http
        .get(`http://localhost:3000/get-event/${id}`, { headers: this.getHeaders()} )
        .toPromise()
  }
  
  


}
