/* import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
 */

/* import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addUserForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      balance: ['', [Validators.required, Validators.min(0)]],
      exposure: ['', [Validators.required, Validators.min(0)]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.addUserForm.valid) {
      console.log('Form Value', this.addUserForm.value);
    }
  }

  onCancel(): void {
    this.addUserForm.reset();
  }
} */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: AuthService) {
    this.addUserForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      balance: ['', [Validators.required, Validators.min(0)]],
      exposure: ['', [Validators.required, Validators.min(0)]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.addUserForm.valid) {
      this.userService.signUp(this.addUserForm.value).subscribe(
        response => {
          console.log('User signed up successfully', response);
          // Handle successful signup, e.g., navigate to another page or display a success message
        },
        error => {
          console.error('Error signing up', error);
          // Handle signup error, e.g., display an error message
        }
      );
    }
  }

  onCancel(): void {
    this.addUserForm.reset();
  }
}
