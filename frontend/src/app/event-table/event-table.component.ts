import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {EventService} from "../services/event.service";
import {ToastrService} from "ngx-toastr";
import {EventCreationModalComponent} from "../modals/event-creation-modal/event-creation-modal.component";
import * as moment from "moment";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.css']
})
export class EventTableComponent implements OnInit {


  @Output() onEventsChanged = new EventEmitter();
  @Input()  monthIndex: number;
  @Input() year: number;
  public rowData: any;
  public events: any;
  eventModal: BsModalRef;
  eventListModal: BsModalRef;



  columnDefs = [
    {headerName: 'Sunday', field: '0',width: 80, cellRenderer: this.renderCell },
    {headerName: 'Monday', field: '1',width: 80, cellRenderer: this.renderCell },
    {headerName: 'Tuesday', field: '2',width: 80, cellRenderer: this.renderCell },
    {headerName: 'Wednesday', field: '3',width: 80, cellRenderer: this.renderCell },
    {headerName: 'Thursday', field: '4',width: 80, cellRenderer: this.renderCell },
    {headerName: 'Friday', field: '5',width: 80, cellRenderer: this.renderCell },
    {headerName: 'Saturday', field: '6',width: 80, cellRenderer: this.renderCell },

  ];



  constructor(private modalService: BsModalService, private eventService: EventService,
              private toastr: ToastrService) {


  }



  ngOnInit() {
  }


  ngOnChanges() {
    this.ReloadData()
  }


  renderCell(item) {

    if (item.value.event) {
      return '<div class="text-success font-weight-bold">' + item.value.date + '</div>';

    } else {

      return '<div>' + item.value.date + '</div>';
    }
  }



  onCellClicked(event) {

        if (event.value.length === 0) {
          this.toastr.info("No Events on this date");
        }
        this.onEventsChanged.emit(event.value);

  }

   public ReloadData() {

    this.prepareData(this.monthIndex, this.year).then( data => {

      this.rowData = data;

    }).catch(err => {

      this.toastr.error(err.message);
    })
  }



  // this function will get date and return if this date has an event or list of events or not
  // and will use this.events
  //
  checkEvent(date) {

    const events = [];
    console.log(this.events.events);
    for ( let i of this.events.events ) {

      let startDate = new Date(i.start_time);
      let endDate = new Date(i.end_time);

      // if date is inbetween end date or start Date
      // we want to show all days in which the event occur
      if (startDate.getDate() <= date && date <= endDate.getDate()  ) {
        events.push(i);
      }
    }
    if (events.length === 0) {
      return null;
    } else {
      return events;
    }

  }


  async prepareData (month: number, year: number)
  {
    const date = new Date(year, month, 1);
    date.setDate(1);
    const day = date.getDay();
    const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0).getDay();
    const rowData = [];
    this.events =  await this.eventService.getAllEvents(month, year);


    //weeks
    for (let i = 1; i <= 5; i++ )
    {
      //week days
      let weekobj = {};
      for (let d = 0; d <= 6; d++)
      {
        if(i == 1)
        {
          if (d < day)
          {
            weekobj[d.toString()] = { date: '', event: [] }
          }
          else
          {
            weekobj[d.toString()] = { date: date.getDate(), event: this.checkEvent(date.getDate()) };
            date.setDate(date.getDate() + 1);
          }
        }
        else if (i == 5)
        {
          if (d > lastDay)
          {
            weekobj[d.toString()] = { date: '', event: [] }
          }
          else
          {
            weekobj[d.toString()] = { date: date.getDate(), event: this.checkEvent(date.getDate()) };
            date.setDate(date.getDate() + 1);
          }
        }
        else
        {
          weekobj[d.toString()] = { date: date.getDate(), event: this.checkEvent(date.getDate()) };
          date.setDate(date.getDate() + 1);
        }

      }

      rowData.push(weekobj);
    }


    return rowData;

  }



}
