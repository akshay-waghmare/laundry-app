import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { namespaceHTML } from '@angular/core/src/render3';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { LogoutFormComponent } from 'src/app/logout-form/logout-form.component';
import { TokenStorage } from 'src/app/token.storage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  showNavBar: boolean = false; // Controls the visibility of the navbar
  //inject AuthService 

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService, private tokenStorage: TokenStorage) { }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getUser());
    this.getUserData(this.user.sub);

    // Show the navbar when user data is loaded
    //this.showNavBar = true;

    this.authService.userUpdates.subscribe((updatedUserDetails) => {
      if (updatedUserDetails) {
        console.log("on update ", updatedUserDetails);
        this.user = updatedUserDetails;
      }
    });
  }

  getUserData(userName: string): void {
    this.authService.getUserByName(userName).subscribe(data => {
      this.user = data;
      console.log(data);
      this.authService.updateUserDetails(data);
    }, error => console.log(error));
  }

  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(LogoutFormComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout();
      }
    });

  }

  logout(): void {
    // Your logout logic here
    console.log('User logged out');
  }

  navigateToBetHistory(): void {
    this.router.navigate(['/account/bet-history']);
  }

  navigateToProfitLoss():void {
    this.router.navigate(['/account/profit-loss']);
  }
}
