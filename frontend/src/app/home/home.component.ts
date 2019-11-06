import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  columnDefs = [
    {headerName: 'Monday', field: 'monday' },
    {headerName: 'Tuesday', field: 'Tuesday' },
    {headerName: 'Wednesday', field: 'Wednesday' },
    {headerName: 'Thursday', field: 'Thursday' },
    {headerName: 'Friday', field: 'Friday' },
    {headerName: 'Saturday', field: 'Saturday' },
    {headerName: 'Sunday', field: 'Sunday' }
  ];
  
  rowData = [
    { Monday: '1', Tuesday: '2', Wednesday: '3', Thursday: '4', Friday: '5', Saturday: '6', Sunday: '7' }
    
  ];
  
  constructor() { }

  ngOnInit() {
    
    
  }
  
  onCellClicked(event)
  {
    console.log(event)
  }
  

}
