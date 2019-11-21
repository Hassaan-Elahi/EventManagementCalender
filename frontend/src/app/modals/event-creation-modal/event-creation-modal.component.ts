import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import { ToastrService } from 'ngx-toastr';
import {EventService} from "../../services/event.service";
import * as moment from 'moment';
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-event-creation-modal',
  templateUrl: './event-creation-modal.component.html',
  styleUrls: ['./event-creation-modal.component.css']
})
export class EventCreationModalComponent implements OnInit {

  @Output() updatedValueEmitter: EventEmitter<any>  = new EventEmitter();
  public id: any = null;
  public name: string = "";
  public startTime: any = null;
  public endTime: any = null;
  public description: string = "";
  public type: string;


  constructor(public modalRef: BsModalRef, public tostr: ToastrService,
              public eventService: EventService,
              public modalService: BsModalService) { }


  ngOnInit()
  {

  }




  IsEventValid(data: { name: string; description: string; startTime: any; endTime: any }) {

    const mStartTime = moment(this.startTime, environment.dateTimeFormat);
    const mEndTime = moment(this.endTime, environment.dateTimeFormat);
    if (data.name === '' || data.name === null) {

      this.tostr.error("Please provide Name for the Event");
      return false;

    }
    else if (data.startTime === null || data.endTime === null) {
      this.tostr.error("Please provide start and end time for the event");
      return false;

    } else if(mStartTime > mEndTime) {
      this.tostr.error("End Time cannot be less than start Time");
      return false;

    } else if (mEndTime.diff(mStartTime, 'days', true) > 2) {
      this.tostr.error("Event duration cannot be more than two(2) days")

    } else {
      return true;
    }

  }


  onSaveEvent()
  {
    const event = { name: this.name, startTime: this.startTime, endTime: this.endTime, description: this.description,};

    if(this.IsEventValid(event)) {

      const data = { name: this.name,
        startTime: ( new Date(this.startTime).toUTCString()),
        endTime: (new Date(this.endTime).toUTCString()),
        description: this.description
        };
      this.eventService.createEvent(data)
          .then(res => {

            this.tostr.success("Event has been created successfully");
            this.modalRef.hide()

          })
          .catch(err => {

            this.tostr.error(err.error.message);

          })
    }
  }

  onUpdateEvent() {

    const event = {name: this.name, startTime: this.startTime, endTime: this.endTime, description: this.description,};

    if (this.IsEventValid(event)) {

      let sTime: any = moment(this.startTime);
      let eTime: any = moment(this.endTime);
      sTime = new Date(sTime.format(environment.dateTimeFormat));
      eTime = new Date(eTime.format(environment.dateTimeFormat));

      const data = {
        id: this.id,
        name: this.name,
        startTime: sTime.toISOString(),
        endTime: eTime.toISOString(),
        description: this.description,
      };

      this.eventService.updateEvent(data)
          .then(res => {

            this.tostr.success("Event has been update successfully");
            this.modalService.setDismissReason(JSON.stringify(data));
            this.modalRef.hide();



          })
          .catch(err => {

            this.tostr.error(err.message);
            this.modalRef.hide();
          })
    }
  }


  onDeleteEvent() {

    this.eventService.deleteEvent(this.id).then( res => {
      this.tostr.success("Event has been deleted successfully");
      this.modalRef.hide();

    }).catch(err => {
      this.tostr.error(err.message);
      this.modalRef.hide()
    })

  }
}
