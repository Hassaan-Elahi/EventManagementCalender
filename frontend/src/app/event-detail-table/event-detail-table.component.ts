import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import * as moment from 'moment'
import {ToastrService} from "ngx-toastr";
import {EventService} from "../services/event.service";
import {EventCreationModalComponent} from "../modals/event-creation-modal/event-creation-modal.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ViewEventModalComponent} from "../modals/view-event-modal/view-event-modal.component";
import {DeleteEventModalComponent} from "../modals/delete-event-modal/delete-event-modal.component";

@Component({
  selector: 'app-event-detail-table',
  templateUrl: './event-detail-table.component.html',
  styleUrls: ['./event-detail-table.component.css']
})
export class EventDetailTableComponent implements OnInit {
  
  @Input() events: any;
  @Input() isActionType: boolean;
  @Input() width: any;
  @Input() height: any;
  
  
  private columnDefs: any;
  viewEventModal: BsModalRef;
  editEventModal: BsModalRef;
  deleteEventModal: BsModalRef;
  
  constructor(private toastr: ToastrService, 
              private eventService: EventService,
              private modalService: BsModalService) { }
  
  
  formatDate(item)  {
    return moment(new Date(item.value)).format(environment.dateTimePrettyFormat)
  }
  
  ngOnInit() {
    if(this.isActionType) {
      this.columnDefs = [
        {headerName: 'Actions', width: 250, resizable: true,cellRenderer: this.renderActionButtons},
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
  
  ngOnChanges() {
    
  }
  
  renderActionButtons() {
    
    return `<button type="button" class="btn  btn-success" data-action-type="view">View</button>
            <button type="button" class="btn  btn-info" data-action-type="update">Update</button>
            <button type="button" class="btn  btn-danger" data-action-type="delete">Delete</button>`;
    
    
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
  
  
  
  private viewEvent(data) {
    
    this.viewEventModal = this.modalService.show(ViewEventModalComponent, {
      
      initialState: {
        id: data['id'],
        name: data['name'],
        startTime: moment.utc(data['startTime']).utcOffset(5).format(environment.dateTimeFormat),
        endTime: moment.utc(data['endTime']).utcOffset(5).format(environment.dateTimeFormat),
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
        startTime: moment.utc(data['startTime']).utcOffset(5).format(environment.dateTimeFormat),
        endTime: moment.utc(data['endTime']).utcOffset(5).format(environment.dateTimeFormat),
        description: data['description'],
      }
      
    });
    
  }
  
  
  
}
