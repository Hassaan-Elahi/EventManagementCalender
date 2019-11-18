import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "./auth.service";
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardService implements CanActivate{

  constructor(private cookieService: CookieService,
              private router:Router,
              private authService: AuthService,
              private toatr: ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot,
             state: RouterStateSnapshot): boolean {

    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.toatr.error('UnAuthorized');
      this.router.navigate(['']);
      return false;
    }


  }
}
