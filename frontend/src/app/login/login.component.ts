import { Component, OnInit } from '@angular/core';
import { LoginService} from '../services/login.service';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

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
    private cookieService: CookieService) 
    { }

  ngOnInit() {
  	
  }
	
	onSubmit() 
	{
  	
		const data = { "email": this.email, "password": this.password};
		this.loginService.login(data)
			.then( data => 
			{
				localStorage.setItem('currentUser',data['user']);
				this.router.navigate(['home']);
			
			})
			.catch( err => 
			{
				console.log(err)
			})
	}
}
