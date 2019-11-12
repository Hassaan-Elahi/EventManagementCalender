import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-list-view-modal',
  templateUrl: './event-list-view-modal.component.html',
  styleUrls: ['./event-list-view-modal.component.css']
})
export class EventListViewModalComponent implements OnInit {

  public eventList: [];
  constructor() { }

  ngOnInit() {
  }

}
