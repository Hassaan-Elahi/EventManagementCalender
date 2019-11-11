import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {EventService} from "../services/event.service";
import {ToastrService} from "ngx-toastr";
import {EventCreationModalComponent} from "../event-creation-modal/event-creation-modal.component";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  public eventModal: BsModalRef;
  public monthIndex: number;
  public year: number;
  
  constructor(private modalService: BsModalService, private eventService: EventService,
              private toastr: ToastrService) {}
  
  
  ngOnInit() {
    
  }
  
  openModal() {
    this.eventModal = this.modalService.show(EventCreationModalComponent, {
      initialState :{
        type: 'creation'
      }
    });
  }
  
  
  onDateChange(event: { monthIndex: number; year: number }) {
    
    // onDataChange will be called when month and year changed on the calender
    // we will change this.monthIndex and this.year which is binded to eventTableComponent
    // and on ngOnChanges() in eventTableComponent will reload the data of events
    this.monthIndex = event.monthIndex;
    this.year = event.year
  }
}
