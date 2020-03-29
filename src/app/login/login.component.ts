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
  }

  signin(){
    console.log("attempt to sign in");
    this.authService.attemptAuth(this.signinForm.value).subscribe((res) =>{
      console.log(res);
      this.tokenStorage.saveToken(res.body.token);
      this.router.navigate(['dashboard']);
      
    } );
  }

  initForm(){
    this.signinForm = this.builder.group({
      username : ["", Validators.required],
      password:["",Validators.required]
    });
  }
}
