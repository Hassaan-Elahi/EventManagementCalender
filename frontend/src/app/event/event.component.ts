import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {EventService} from "../services/event.service";
import {ToastrService} from "ngx-toastr";
import {EventCreationModalComponent} from "../modals/event-creation-modal/event-creation-modal.component";
import {EventTableComponent} from "../event-table/event-table.component";
import * as moment from "moment";
import {environment} from "../../environments/environment";

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
  public date: number;
  public events: any = [];
  public pageNo: number = 1;
  public pageSize: number;


  constructor(private modalService: BsModalService, private eventService: EventService,
              private toastr: ToastrService) {
  }


  ngOnInit() {

  }


  // Create event modal open, pre filled with current date
  openModal() {
    this.eventModal = this.modalService.show(EventCreationModalComponent, {
      initialState: {
        type: 'create',
        startTime: moment((new Date())).format(environment.dateTimeFormat),
        endTime: moment((new Date())).format(environment.dateTimeFormat),

      }
    });
    const modal = this.modalService.onHide.subscribe(result => {
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


  // this event is emitted from eventTable with month year and date
  onEventTableCellClicked(event) {
    console.log(event);

    this.pageNo = 1;
    this.pageSize = 5;
    this.monthIndex = event.month;
    this.year = event.year;
    this.date = event.date;
    this.eventService.getEvents(event.year, event.month, event.date).then(data => {
      this.events = data;
    }).catch(err => {
      this.toastr.error(err.message);
    });

  }


  onPageChangeEvent(event) {

    this.pageNo = event.pageNo;
    this.pageSize = event.pageSize;
    this.eventService.getEvents(this.year, this.monthIndex, this.date, event.pageNo, event.pageSize).then(data => {

      this.events = data;

    })

  }
}
