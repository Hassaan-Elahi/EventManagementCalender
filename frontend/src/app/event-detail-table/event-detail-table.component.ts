import {Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges} from '@angular/core';
import {environment} from "../../environments/environment";
import * as moment from 'moment'
import {ToastrService} from "ngx-toastr";
import {EventService} from "../services/event.service";
import {EventCreationModalComponent} from "../modals/event-creation-modal/event-creation-modal.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ViewEventModalComponent} from "../modals/view-event-modal/view-event-modal.component";
import {DeleteEventModalComponent} from "../modals/delete-event-modal/delete-event-modal.component";
import {GridApi, GridOptions, IDatasource, IGetRowsParams} from "ag-grid-community";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-event-detail-table',
  templateUrl: './event-detail-table.component.html',
  styleUrls: ['./event-detail-table.component.css']
})
export class EventDetailTableComponent implements OnInit, OnChanges {

  @Input() pageNo: number;
  @Input() pageSize: number;
  @Input() events: any = [];
  @Input() isActionType: boolean;
  @Input() width: any;
  @Input() height: any;
  @Input() rowHeight: any;
  @Output() onChangeEventEmitter = new EventEmitter();
  @Output() onPaginationEventEmitter = new EventEmitter<{pageNo: number, pageSize: number}>();


  columnDefs: any;
  viewEventModal: BsModalRef;
  editEventModal: BsModalRef;
  deleteEventModal: BsModalRef;

  isLeftDisabled = true;
  isRightDisabled = false;



  constructor(private toastr: ToastrService,
              private eventService: EventService,
              private modalService: BsModalService,
              private httpService: HttpClient) { }


  formatDate(item)  {
    return moment(new Date(item.value)).format(environment.dateTimePrettyFormat)
  }

  ngOnInit() {

    if(this.isActionType) {
      this.columnDefs = [
        {headerName: 'Actions', width: 250, resizable:  true,cellRenderer: this.renderActionButtons, autoHeight: true},
        {headerName: 'id', field: 'id', width: 50, resizable: true},
        {headerName: 'Name', field: 'name', width:170, resizable: true},
        {headerName: 'Start Time', field:  'start_time',width:165, resizable: true, cellRenderer: this.formatDate},
        {headerName: 'End Time', field: 'end_time', width:165 ,resizable: true, cellRenderer: this.formatDate},
        {headerName: 'Description', field: 'description' , resizable: true},

      ];

    } else {

      this.columnDefs = [
        {headerName: 'id', field: 'id', resizable: true},
        {headerName: 'Name', field: 'name', resizable: true},
        {headerName: 'Start Time', field: 'start_time', resizable: true, cellRenderer: this.formatDate},
        {headerName: 'End Time', field: 'end_time',resizable: true ,cellRenderer: this.formatDate},
        {headerName: 'Description', field: 'description', resizable: true},

      ];

    }
  }

  renderActionButtons() {

    return `<button type="button" class="btn  btn-success btn-sm" data-action-type="view">View</button>
            <button type="button" class="btn  btn-info btn-sm" data-action-type="update">Update</button>
            <button type="button" class="btn  btn-danger btn-sm" data-action-type="delete">Delete</button>`;


  }

  onCellClicked(e) {

    if (e.event.target.getAttribute('data-action-type') === 'view') {
      this.viewEvent(e.data);
    } else if ((e.event.target.getAttribute('data-action-type') === 'update')) {
      this.updateEvent(e.data);
    } else if (e.event.target.getAttribute('data-action-type') === 'delete') {
      this.deleteEvent(e.data);
    }
  }

ngOnChanges(changes: SimpleChanges): void {
  console.log(changes);
  try {
  if (changes.events.currentValue.length === 0) {
    this.isRightDisabled = true;
  } else {
        this.isRightDisabled = false;
  }
  } catch (e) {

  }
}

  private viewEvent(data) {

    this.viewEventModal = this.modalService.show(ViewEventModalComponent, {

      initialState: {
        id: data['id'],
        name: data['name'],
        startTime: new Date(data['start_time']),
        endTime: new Date(data['end_time']),
        description: data['description'],
      }

    });


  }

  private deleteEvent(data) {

    this.deleteEventModal = this.modalService.show(DeleteEventModalComponent);
    this.deleteEventModal.content.title = 'Are you sure you want to delete this Event?';
    const modal = this.modalService.onHide.subscribe(result => {
      if (result === "yes") {
        this.eventService.deleteEvent(data.id).then( res => {

          this.toastr.success("Event has been deleted successfully");
          this.RemoveEventLocallyFromDetailComponent(data.id);
          this.onChangeEventEmitter.emit();

        }).catch( err => {
          this.toastr.error(err.message);
        })



      } else {
        this.deleteEventModal.hide();
      }
      modal.unsubscribe();
    })

  }



  private updateEvent(data) {

    this.editEventModal = this.modalService.show(EventCreationModalComponent, {
      initialState: {
        type: 'edit',
        id: data['id'],
        name: data['name'],
        startTime: moment(new Date(data['start_time'])).format(environment.dateTimeFormat),
        endTime: moment(new Date(data['end_time'])).format(environment.dateTimeFormat),
        description: data['description'],
      }

    });


    // returnig value form update modal and updating list locally
    this.modalService.onHide.subscribe((updatedEvent) => {

      console.log(updatedEvent);
      let tempEvents = null;
      try {
        updatedEvent = JSON.parse(updatedEvent);
        tempEvents = JSON.parse(JSON.stringify(this.events));
      } catch (e) {
      }
      this.events = null;
      // updating locally
      for (let e of tempEvents) {
        if (e.id === updatedEvent.id) {
          e.name = updatedEvent.name;
          e.startTime = updatedEvent.startTime;
          e.endTime = updatedEvent.endTime;
          e.description = updatedEvent.description;
        }
      }
      this.events = tempEvents;
    });

  }
  private RemoveEventLocallyFromDetailComponent(id: any) {
    let tempEvents = [];
    for (let e of this.events) {
      if (e.id !== id) {
          tempEvents.push(e)
      }
    }
    this.events = tempEvents;

  }

  prev() {
    if (this.pageNo === 2) {
        this.pageNo = 1;
        this.isLeftDisabled = true;
    } else {
      this.pageNo--;
    }
    this.onPaginationEventEmitter.emit({pageNo: this.pageNo, pageSize: this.pageSize})
  }

  next() {
    if (this.pageNo == 1) {
      this.isLeftDisabled = false;
      this.pageNo = 2
    } else {
      this.pageNo++;
    }
    this.onPaginationEventEmitter.emit({pageNo: this.pageNo, pageSize: this.pageSize})
  }
}
