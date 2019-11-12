import { Component, OnInit } from '@angular/core';
import {EventCreationModalComponent} from "../event-creation-modal/event-creation-modal.component";
import * as moment from "moment";
import {environment} from "../../environments/environment";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-event-list-view-modal',
  templateUrl: './event-list-view-modal.component.html',
  styleUrls: ['./event-list-view-modal.component.css']
})
export class EventListViewModalComponent implements OnInit {
  eventModal: BsModalRef;
  public eventList: [];
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  
  onItemClicked(clickEvent, tag) {
    clickEvent.preventDefault();
    let id = tag.getAttribute('data-id');
    console.log(id);
  
    function getEventById(id, eventList) {
      for (let i of eventList) {
        if (i.id === parseInt(id)) {
          return i;
        }
      }
    }
  
    let event = getEventById(id, this.eventList);
    
    this.eventModal = this.modalService.show(EventCreationModalComponent, {
      initialState: {
        type: 'view',
        id: event['id'],
        name: event['name'],
        startTime: moment.utc(event['startTime']).utcOffset(5).format(environment.dateTimeFormat),
        endTime: moment.utc(event['endTime']).utcOffset(5).format(environment.dateTimeFormat),
        description: event['description'],
      
      }
    });
    const modal = this.modalService.onHide.subscribe( result => {
      modal.unsubscribe();
    });
    
    
    
  }

}
