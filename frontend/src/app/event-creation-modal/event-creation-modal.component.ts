import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import { ToastrService } from 'ngx-toastr';
import {EventService} from "../services/event.service";
import * as moment from 'moment';
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-event-creation-modal',
  templateUrl: './event-creation-modal.component.html',
  styleUrls: ['./event-creation-modal.component.css']
})
export class EventCreationModalComponent implements OnInit {
  
  public id: any = null;
  public name: string = "";
  public startTime: any = null;
  public endTime: any = null;
  public description: string = "";
  private readOnly = true;
  private isUpdateHidden = false;
  private isSaveHidden = true;
  private isDeleteHidden = false;
  public type: string;

  
  constructor(public modalRef: BsModalRef, public tostr: ToastrService, 
              public eventService: EventService) { }

              
  changeView(type) {
    if (type === 'view') {
    
      this.readOnly = true;
      this.isUpdateHidden = false;
      this.isDeleteHidden = false;
      this.isSaveHidden = true;
    
    } else {
      this.readOnly = false;
      this.isUpdateHidden=true;
      this.isDeleteHidden=true;
      this.isSaveHidden=false;
    }
    
  }
              
  ngOnInit() 
  {
    this.changeView(this.type);
  }
  
  
  IsEventValid(data: { name: string; description: string; startTime: any; endTime: any }) {
    
    const mStartTime = moment(this.startTime, environment.dateTimeFormat);
    const mEndTime = moment(this.endTime, environment.dateTimeFormat)
    if (data.name === '' || data.name === null) {
      
      this.tostr.error("Please provide Name for the Event");
      return false;
      
    }
    else if (data.startTime === null || data.endTime === null) {
      this.tostr.error("Please provide start and end time for the event");
      return false;
      
    } else if(mStartTime > mEndTime) {
      this.tostr.error("End Time cannot be less than start Time");
      return false;
  
    } else if (mEndTime.diff(mStartTime, 'days', true) > 2) {
      this.tostr.error("Event duration cannot be more than two(2) days")
  
    } else {
      return true;
    }
      
  }
  
  
  onSaveEvent()
  {
    //.utc().format() converts into utc and outputs time into utc format
    //.local().format() converts into local and outputs time into local format
    const event = { name: this.name, startTime: this.startTime, endTime: this.endTime, description: this.description,};
    
    if(this.IsEventValid(event)) {
  
      const sTime = moment(this.startTime, environment.dateTimeFormat);
      const eTime = moment(this.endTime, environment.dateTimeFormat);
  
      const data = { name: this.name, startTime: sTime.utc().format(environment.dateTimeFormat), endTime: eTime.utc().format(environment.dateTimeFormat), description: this.description,};
      this.eventService.createEvent(data)
          .then(res => {
        
            this.tostr.success("Event has been created successfully");
            this.modalRef.hide()
        
          })
          .catch(err => {
        
            this.tostr.error(err.message);
            this.modalRef.hide();
          })
    }
  }
  
  onUpdateEvent() {
    this.changeView('create')
  }
  

  onDeleteEvent() {
    
    this.eventService.deleteEvent(this.id).then( res => {
      this.tostr.success("Event has been deleted successfully")
      this.modalRef.hide();
      
    }).catch(err => {
      this.tostr.error(err.message);
      this.modalRef.hide()
    })
    
  }
}
