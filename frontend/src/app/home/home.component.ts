import {Component, OnInit, ViewChild} from '@angular/core';
import {IgxMonthPickerComponent} from "igniteui-angular";
import {MomentAll} from "ngx-bootstrap/chronos/test/chain";
import { EventCreationModalComponent} from "../event-creation-modal/event-creation-modal.component";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  modalRef: BsModalRef;
  rowData = [];
  
  columnDefs = [
    {headerName: 'Sunday', field: '0',width: 80,   cellRenderer: (item) => {this.renderCell(item)}},
    {headerName: 'Monday', field: '1',width: 80, cellRenderer: (item) => {this.renderCell(item) }},
    {headerName: 'Tuesday', field: '2',width: 80, cellRenderer: (item) => {this.renderCell(item) }},
    {headerName: 'Wednesday', field: '3',width: 80, cellRenderer: (item) => {this.renderCell(item) }},
    {headerName: 'Thursday', field: '4',width: 80, cellRenderer: (item) => {this.renderCell(item) }},
    {headerName: 'Friday', field: '5',width: 80, cellRenderer: (item) => {this.renderCell(item) }},
    {headerName: 'Saturday', field: '6',width: 80, cellRenderer: (item) => {this.renderCell(item) }},
    
  ];
  

  constructor(public modalService: BsModalService) { }
  
  
  ngOnInit() {
    this.rowData = this.prepareData(10, 2019)
  }
  
  openModal() 
  {
    this.modalRef = this.modalService.show(EventCreationModalComponent);
  }
  
  renderCell(item)
  {
    
  }
  
  
  onCellClicked(event)
  {
    console.log(event)
  }
  
  
  onChange(event) 
  {
    console.log(event)
    this.rowData = this.prepareData(event.monthIndex, event.year)
  }
  
  onClick()
  {
      
  }
  
  prepareData (month: number, year: number)
  {
    const date = new Date(year, month, 1);
    date.setDate(1)
    const day = date.getDay();
    const lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0).getDay();
    const rowData = [];

    
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
              weekobj[d.toString()] = ''
            }
            else 
            {
              weekobj[d.toString()] = date.getDate();
              date.setDate(date.getDate() + 1);
            }
        }
        else if (i == 5)
        {
          if (d > lastDay)
          {
            weekobj[d.toString()] = ''
          }
          else 
          {
            weekobj[d.toString()] = date.getDate();
            date.setDate(date.getDate() + 1);
          }
        }
        else 
        {
          weekobj[d.toString()] = date.getDate();
          date.setDate(date.getDate() + 1);
        }
        
        
        
      }
      
      rowData.push(weekobj);
    }
    
    
    return rowData;
    
  }
}
