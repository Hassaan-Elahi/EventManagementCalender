import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public name;
  public email;
  
  constructor(private _cookieService: CookieService) { }

  ngOnInit() {
    
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.name = user['name'];
    this.email = user['email'];
    
  }

}
