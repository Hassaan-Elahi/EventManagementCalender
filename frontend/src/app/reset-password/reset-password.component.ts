import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {EventService} from "../services/event.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public newPassword: string = "";
  public newPasswordAgain: string = "";
  
  
  
  constructor(private toastr: ToastrService, private eventService: EventService) { }

  
  
  ngOnInit() {
  }

  onSave() {
    if (this.newPassword !== this.newPasswordAgain) {
      this.toastr.error("Please enter same password")
    } else {
      
      this.eventService.resetPassword(this.newPassword).then( res => {
        this.toastr.success("Your Password has been changed successfully")
      }).catch(err => {
        this.toastr.error("Something Went wrong. "+ err.message)
      });
    }
  }
  
  
}
