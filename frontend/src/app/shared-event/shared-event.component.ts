import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {EventService} from "../services/event.service";

@Component({
  selector: 'app-shared-event',
  templateUrl: './shared-event.component.html',
  styleUrls: ['./shared-event.component.css']
})
export class SharedEventComponent implements OnInit {

  public email: string = "";
  public events: any;
  
  constructor(private toatr : ToastrService, private eventService: EventService) { }

  ngOnInit() {
    

    // by default current users events will be displayed
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.email = currentUser.email;
    this.onSearchClick();
    
  }
  
  onSearchClick() {
    this.eventService.getEventsByEmail(this.email).then(res => {
      this.events = res['events'];
    }).catch(err => {
      this.toatr.error(err.message);
    })
  }

}
