import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {EventService} from "../services/event.service";
import {ToastrService} from "ngx-toastr";
import {EventCreationModalComponent} from "../modals/event-creation-modal/event-creation-modal.component";
import {EventTableComponent} from "../event-table/event-table.component";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @ViewChild(EventTableComponent, {static: false})

  eventTable: EventTableComponent;
  public eventModal: BsModalRef;
  public monthIndex: number;
  public year: number;
  public events: any = [];


  constructor(private modalService: BsModalService, private eventService: EventService,
              private toastr: ToastrService) {}


  ngOnInit() {

  }

  openModal() {
    this.eventModal = this.modalService.show(EventCreationModalComponent, {
      initialState :{
        type: 'create'
      }
    });
    const modal = this.modalService.onHide.subscribe( result => {
      this.eventTable.ReloadData();
      modal.unsubscribe();
    });
  }


  onDateChange(event: { monthIndex: number; year: number }) {

    // onDataChange will be called when month and year changed on the calender
    // we will change this.monthIndex and this.year which is binded to eventTableComponent
    // and on ngOnChanges() in eventTableComponent will reload the data of events
    this.monthIndex = event.monthIndex;
    this.year = event.year
  }

  // event has been changed in event-detail component
  // eventTable has to be reloaded
  onChangeEvent() {
    this.eventTable.ReloadData();
  }


  // this event is emitted
  onEventTableCellClicked(event) {
    this.events = event.event;


  }

}
