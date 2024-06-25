import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-form',
  templateUrl: './logout-form.component.html',
  styleUrls: ['./logout-form.component.css']
})
export class LogoutFormComponent {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<LogoutFormComponent>
  ) {}

  logout() {
    // Clear user session or token here
    //localStorage.removeItem('userToken');  
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }

  cancel() {
    this.dialogRef.close();
  }
}



