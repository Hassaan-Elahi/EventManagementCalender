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


  @Output() onCellClickedEmitter = new EventEmitter();
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
      return '<div style="background-color:lightgray" class="text-danger font-weight-bold">' + item.value.date + '</div>';

    } else {

      return '<div>' + item.value.date + '</div>';
    }
  }



  onCellClicked(event) {

        if (event.value.event === null) {
          this.toastr.info("No Events on this date");
        }
        this.onCellClickedEmitter.emit({ year: this.year, month: this.monthIndex, date: event.value.date });

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

    if (date in this.events.dateEvent) {
      return true;
    } else {
      return false;
    }
  }



  // use this.ReloadData() here, --- simple solution
  removeEvent(deletedEventId: string) {
    for (let e of this.rowData) {
      for (let weekObj of e) {
        if (weekObj === 'events') {
          if(e[weekObj]) {
            console.log(e);
          }
        }
      }
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
            weekobj[d.toString()] = { date: '', event: false }
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
            weekobj[d.toString()] = { date: '', event: false }
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
