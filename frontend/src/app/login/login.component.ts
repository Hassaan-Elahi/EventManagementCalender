import { Component, OnInit } from '@angular/core';
import { LoginService} from '../services/login.service';
import {Router} from "@angular/router";

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
    private router: Router) 
    { }

  ngOnInit() {
  	
  }
	
	onSubmit() 
	{
  	
		const data = { "email": this.email, "password": this.password};
		this.loginService.login(data)
			.then( data => 
			{
				localStorage.setItem('user', data['user']);
				this.router.navigate(['home']);
			
			})
			.catch( err => 
			{
				console.log(err)
			})
	}
}
