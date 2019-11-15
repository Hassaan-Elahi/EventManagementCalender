import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-view-event-modal',
  templateUrl: './view-event-modal.component.html',
  styleUrls: ['./view-event-modal.component.css']
})
export class ViewEventModalComponent implements OnInit {

  public modalRef: BsModalRef;
  public name: string;
  public startTime: string;
  public endTime: string;
  public description: string;
  
  constructor() { }

  ngOnInit() {
  }

}
