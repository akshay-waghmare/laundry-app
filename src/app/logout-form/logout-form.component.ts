import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { TokenStorage } from '../token.storage';

@Component({
  selector: 'app-logout-form',
  templateUrl: './logout-form.component.html',
  styleUrls: ['./logout-form.component.css']
})
export class LogoutFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LogoutFormComponent>,
    private router: Router, // Inject the router
    private tokenStorage: TokenStorage // Inject the TokenStorage service

  ) {}

  ngOnInit(): void {
    //
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onLogout(): void {
    this.tokenStorage.signOut(); // Assuming you have a signOut method to remove the token
    // Logic for logout action
    this.dialogRef.close(true);
    // Navigate to the login page
    this.router.navigate(['/login']);
  }

}
