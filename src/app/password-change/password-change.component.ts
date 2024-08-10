import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordChangeService } from './password-change.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  passwordChangeForm: FormGroup;

  constructor(private fb: FormBuilder, private passwordChangeService: PasswordChangeService,private router: Router) {
    this.passwordChangeForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatchValidator });
  }

  ngOnInit(): void {}

  passwordsMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword').value;
     const confirmPassword = form.get('confirmPassword').value;

    return newPassword === confirmPassword ? null : { mismatch: true };
  }


  
  onSubmit(): void {
    if (this.passwordChangeForm.valid) {
      const formData = this.passwordChangeForm.value;
      this.passwordChangeService.changePassword(formData.currentPassword, formData.newPassword).subscribe(
        response => {
          // Handle successful response
          console.log('Password changed successfully', response);
          this.router.navigate(['/login']);
        },
        error => {
          // Handle error response
          console.error('Error changing password', error);
        }
      );
    }
  }
}

