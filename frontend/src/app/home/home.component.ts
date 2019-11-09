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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  modalRef: BsModalRef;
  public rowData = [];
  public events: any;
  eventModal: BsModalRef;
  
  
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
  
  openModal() {
    this.modalRef = this.modalService.show(EventCreationModalComponent, {
      initialState :{
        type: 'creation'
      }
    });
  }
  
  
  renderCell(item) {
  
    if (item.value.event) {
      return '<div class="text-success font-weight-bold">' + item.value.date + '</div>';
    
    } else {
    
      return '<div>' + item.value.date + '</div>';
    }
  }
  
  
  onCellClicked(event) {
    
    console.log(event);
    // date on which click
    if (event.value.event) {
      
      this.eventService.getEvent(event.value.event).then(event => {
    
        const date = moment(event['startTime']);
        this.eventModal = this.modalService.show(EventCreationModalComponent, {
          initialState: {
            type: 'view',
            name: event['name'],
            startTime: moment.utc(event['startTime']).format(environment.dateTimeFormat),
            endTime: moment.utc(event['endTime']).format(environment.dateTimeFormat),
            description: event['description']
          }
        })
    
      }).catch(err => {
    
        this.toastr.error(err.message)
      });
  
    } else {
      this.toastr.info("No Event on this date")
    }
    
    
    // this.eventService.getEvent(data).then( data => {
    //  
    //   this.eventModal = this.modalService.show(ViewEventModalComponent)
    //  
    // }).catch(err => {
    //   console.log(err);
    //
    // });
  }
  
  
  async onChange(event) {
    
    console.log('in onChange event');
    console.log(event);
    
    this.prepareData(event.monthIndex, event.year).then( data => {
    
      this.rowData = data;
      
    }).catch(err => {
      console.log(err)
    })
  }
  

  
  // this function will get date and return if this date has an event or not
  // and will use this.events
  //
  checkEvent(date) {
    
    for ( let i of this.events.data ) {
             
        let startDate = moment.utc(i.startTime).local().date();
        
        if (date === startDate ) {
          return i.id;
        }
    }
    return null;
    
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
