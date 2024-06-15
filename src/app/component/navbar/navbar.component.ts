import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { namespaceHTML } from '@angular/core/src/render3';
import { AuthService } from 'src/app/auth.service';
import { TokenStorage } from 'src/app/token.storage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;

  //inject AuthService 

  constructor(private authService : AuthService , private tokenStorage : TokenStorage) { }

  ngOnInit() {
    this.user = JSON.parse(this.tokenStorage.getUser());
    this.getUserData(this.user.sub);

    this.authService.userUpdates.subscribe((updatedUserDetails) => {
      if (updatedUserDetails) {
        console.log("on update " , updatedUserDetails);
        this.user = updatedUserDetails;
      }
    });
  }

  getUserData(userName : string) : void {
    this.authService.getUserByName(userName).subscribe(data => {
      this.user = data;
      console.log(data);
      this.authService.updateUserDetails(data);
    }, error => console.log(error));
  }
}
