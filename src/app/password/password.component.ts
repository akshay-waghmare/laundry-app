

/*   checkPasswordStrength() {
    const password = this.passwordChangeForm.get('newPassword').value;
    if (password.length < 6) {
      this.passwordStrength = 'Weak';
    } else if (password.length < 10) {
      this.passwordStrength = 'Medium';
    } else {
      this.passwordStrength = 'Strong';
    }
  } */

  
 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  passwordChangeForm: FormGroup;
  passwordStrength: string;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.passwordChangeForm = this.fb.group({
      currentPassword: ['', [Validators.required, this.validatePassword]],
      newPassword: ['', [Validators.required, Validators.minLength(8), this.validatePassword]],
      confirmNewPassword: ['', [Validators.required, this.validateConfirmPassword]]
    }, { validator: this.passwordsMatch });

    // Watch for changes in the new password field to update validation in real-time
    this.passwordChangeForm.get('newPassword').valueChanges.subscribe(() => {
      if (this.passwordChangeForm.get('newPassword').invalid && this.passwordChangeForm.get('newPassword').dirty) {
        this.passwordChangeForm.get('newPassword').setErrors({ 'invalidPassword': true });
      }
    });

    // Watch for changes in the confirm new password field to update validation in real-time
    this.passwordChangeForm.get('confirmNewPassword').valueChanges.subscribe(() => {
      if (this.passwordChangeForm.get('confirmNewPassword').invalid && this.passwordChangeForm.get('confirmNewPassword').dirty) {
        this.passwordChangeForm.get('confirmNewPassword').setErrors({ 'invalidPassword': true });
      }
    });
  }

  get f() { return this.passwordChangeForm.controls; }

  // Custom validator for password containing both letters and numbers, no special characters
  validatePassword(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return { 'invalidPassword': true };
    }
    return null;
  }

  // Custom validator for confirming new password, no special characters
  validateConfirmPassword(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.root.get('newPassword');
    const confirmNewPassword = control.value;
    if (newPassword && newPassword.value !== confirmNewPassword) {
      return { 'passwordsNotMatch': true };
    }
    if (!/^[a-zA-Z0-9]+$/.test(confirmNewPassword)) {
      return { 'invalidPassword': true };
    }
    return null;
  }

  passwordsMatch(group: FormGroup) {
    const newPassword = group.get('newPassword').value;
    const confirmNewPassword = group.get('confirmNewPassword').value;
    return newPassword === confirmNewPassword ? null : { notMatching: true };
  }

  onSubmit() {
    this.submitted = true;

    if (this.passwordChangeForm.valid) {
      const payload = {
        currentPassword: this.passwordChangeForm.get('currentPassword').value,
        newPassword: this.passwordChangeForm.get('newPassword').value
      };
      
      this.http.post('/api/change-password', payload).subscribe(
        response => {
          console.log('Password changed successfully', response);
        },
        error => {
          console.error('Error changing password', error);
        }
      );
    }
  }

  cancel() {
    // Implement cancellation logic, e.g., navigate back to the previous page
  }
}






