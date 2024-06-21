import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-form',
  templateUrl: './logout-form.component.html',
  styleUrls: ['./logout-form.component.css']
})
export class LogoutFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LogoutFormComponent>,
    private router: Router // Inject the router
  ) {}

  ngOnInit(): void {
    //
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onLogout(): void {
    // Logic for logout action
    this.dialogRef.close(true);
    // Navigate to the login page
    this.router.navigate(['/login']);
  }

}
