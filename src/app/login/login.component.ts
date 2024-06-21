import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { TokenStorage } from '../token.storage';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { any } from 'underscore';

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
    this.authService.attemptAuth(this.signinForm.value).pipe(
      switchMap((res :(any)) => {
        console.log(res);
        let user = window.atob(res.body.token.split('.')[1]);
        console.log(user);
        this.tokenStorage.saveToken(user, res.body.token);
        user = JSON.parse(user);
        return this.authService.getUserByName(user.sub);
      }),
      catchError(err => {
        console.error(err);
        // handle error appropriately
        return EMPTY; // or throwError(err) based on your error handling strategy
      })
    ).subscribe((userDetails) => {
      this.authService.updateUserDetails(userDetails);
      this.router.navigate(['dashboard']);
    });
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
