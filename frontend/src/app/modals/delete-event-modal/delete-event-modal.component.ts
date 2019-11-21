import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-delete-event-modal',
  templateUrl: './delete-event-modal.component.html',
  styleUrls: ['./delete-event-modal.component.css']
})
export class DeleteEventModalComponent implements OnInit {

  public title: string;
  constructor(public bsModalRef: BsModalRef,
              private modalService: BsModalService)
  { }


  ngOnInit() {

  }

  confirmation(result) {
    this.modalService.setDismissReason(result);
    this.bsModalRef.hide();

  }


}
