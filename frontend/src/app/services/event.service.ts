import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }
  
  getHeaders()
  {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
  
  
  public getAllEvents (month, year)
  {
    
    return this.http
        .get(`http://localhost:3000/events/${year}/${month}`, { headers: this.getHeaders()} )
        .toPromise()
  }
  
  
  public createEvent (data)
  {
    
    return this.http
        .post(`http://localhost:3000/create-event`, { headers: this.getHeaders()} )
        .toPromise()
  }
  
  


}
