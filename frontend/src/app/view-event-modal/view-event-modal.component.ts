import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {ToastrService} from "ngx-toastr";
import {EventService} from "../services/event.service";

@Component({
  selector: 'app-view-event-modal',
  templateUrl: './view-event-modal.component.html',
  styleUrls: ['./view-event-modal.component.css']
})
export class ViewEventModalComponent implements OnInit {

  private readOnly = true;
  private isUpdateHidden = false;
  private isSaveHidden = true;
  private isDeleteHidden = false;

  constructor(public modalRef: BsModalRef, public tostr: ToastrService,
              public eventService: EventService) { }
  
  
  ngOnInit() {
  }
  
  
  
  onUpdateEvent() {
    
  
  }
  
  
  
  onDeleteEvent() {
    
  }
  
  
  onSaveEvent() {
    
  }
}
