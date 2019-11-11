import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }
  
  
  public getAllEvents (month, year) {
    return this.http
        .get(environment.baseUrl + 'events', {params: {year: year, month: month}} )
        .toPromise()
  }
  
  
  public createEvent (data) {
    return this.http
        .post(environment.baseUrl + 'create-event', data )
        .toPromise()
  }
  
  
  public updateEvent (data) {
    return this.http
        .patch(environment.baseUrl + 'update-event', data )
        .toPromise()
  }
  
  
  
  public deleteEvent(id) {
    return this.http
        .delete(environment.baseUrl + `delete-event/${id}`)
        .toPromise();
  }
  
  
  public getEvent (id) {
    return this.http
        .get(environment.baseUrl + `get-event/${id}`)
        .toPromise()
  }
  
  


}
