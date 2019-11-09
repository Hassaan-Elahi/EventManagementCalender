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
  
  public name: string;
  public startTime: any;
  public endTime: any;
  public description: string = "";
  private readOnly = true;
  private isUpdateHidden = false;
  private isSaveHidden = true;
  private isDeleteHidden = false;
  public type;
  
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
  
  
  onSaveEvent()
  {
         
    
  
    const sTime = moment(this.startTime, environment.dateTimeFormat);
    const eTime = moment(this.endTime, environment.dateTimeFormat);
    
    //.utc().format() converts into utc and outputs time into utc format
    //.local().format() converts into local and outputs time into local format
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
  
  onUpdateEvent() {
    this.changeView('create')
  }
  

  onDeleteEvent() {
    
  }
}
