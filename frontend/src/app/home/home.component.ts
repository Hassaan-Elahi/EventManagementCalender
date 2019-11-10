import {Component, OnInit, ViewChild} from '@angular/core';
import {IgxMonthPickerComponent} from "igniteui-angular";
import {MomentAll} from "ngx-bootstrap/chronos/test/chain";
import { EventCreationModalComponent} from "../event-creation-modal/event-creation-modal.component";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {EventService} from "../services/event.service";
import {ToastrService} from "ngx-toastr";
import * as moment from 'moment'
import {ViewEventModalComponent} from "../view-event-modal/view-event-modal.component";
import {initialState} from "ngx-bootstrap/timepicker/reducer/timepicker.reducer";
import {environment} from "../../environments/environment";
import {EventTableComponent} from "../event-table/event-table.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
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
