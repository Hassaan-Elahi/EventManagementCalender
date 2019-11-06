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
  public date: Date;
  public startTime: Date;
  public endTime: Date;
  public description: string;
  
  constructor(public modalRef: BsModalRef, public tostr: ToastrService, 
              public eventService: EventService) { }

  ngOnInit() {
  }
  
  
  onCreateEvent()
  {
    const data = { name: this.name, startTime: this.startTime, endTime: this.endTime, description: this.description, 
                   date: this.date }; 
                   
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
