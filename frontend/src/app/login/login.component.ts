import { Component, OnInit } from '@angular/core';
import { LoginService} from '../services/login.service';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email = '';
  public password = '';
  constructor(
  	private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService,
    private toastr: ToastrService)
    { }

  ngOnInit() {

  }

	onSubmit()
	{

		const data = { "email": this.email, "password": this.password};
		this.loginService.login(data)
			.then( data =>
			{
				localStorage.setItem('currentUser',JSON.stringify(data['user']));
				this.router.navigate(['home/event']);

			})
			.catch( err =>
			{
			  this.toastr.error("Invalid User Name or Password");
				console.log(err)
			})
	}
}
