import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { TokenStorage } from '../token.storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private readonly builder : FormBuilder,
    private authService : AuthService,
    private tokenStorage:TokenStorage,
    private router: Router,
    ) { 
    this.initForm();
  }

  ngOnInit() {
    this.logout();
  }

  signin(){
    console.log("attempt to sign in");
    this.authService.attemptAuth(this.signinForm.value).subscribe((res) =>{
      console.log(res);
      let user = window.atob(res.body.token.split('.')[1]);
      console.log(user);
      this.tokenStorage.saveToken(user,res.body.token);
      this.router.navigate(['dashboard']);
      
    } );
  }

  public logout() {

  	// Remove user from local storage to log user out
  	this.tokenStorage.signOut();
  }

  initForm(){
    this.signinForm = this.builder.group({
      username : ["", Validators.required],
      password:["",Validators.required]
    });
  }
}
