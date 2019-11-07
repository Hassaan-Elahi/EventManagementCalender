import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import { ToastrService } from 'ngx-toastr';
import {EventService} from "../services/event.service";

@Component({
  selector: 'app-event-creation-modal',
  templateUrl: './event-creation-modal.component.html',
  styleUrls: ['./event-creation-modal.component.css']
})
export class EventCreationModalComponent implements OnInit {
  
  public name: string;
  public strDate: string;
  public startTime: any;
  public endTime: any;
  public description: string;
  
  constructor(public modalRef: BsModalRef, public tostr: ToastrService, 
              public eventService: EventService) { }

  ngOnInit() {
  }
  
  
  onCreateEvent()
  {
         
    
    // can also use moment here
    const date =  new Date(Date.parse(this.strDate));
    date.setHours(this.startTime.split(':')[0], this.startTime.split(':')[1])
    this.startTime = new Date(date);
    date.setHours(this.endTime.split(':')[0], this.endTime.split(':')[1])
    this.endTime = new Date(date)
    const data = { name: this.name, startTime: this.startTime, endTime: this.endTime, description: this.description,
      date: this.strDate };

    
      this.eventService.createEvent(data)
        .then(res => {
      
          this.tostr.success("Event has been created successfully")
          this.modalRef.hide()
          
        })
        .catch(err =>{
          
          this.tostr.error(err)
          this.modalRef.hide()
        })
  }

}
