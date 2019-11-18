import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
  }

  logout(event) {

    this.cookieService.deleteAll();
    localStorage.clear();
    this.router.navigate(['login'])

  }

}
