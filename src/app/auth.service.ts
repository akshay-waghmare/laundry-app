import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenStorage } from './token.storage';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';



const authHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userUrl = environment.REST_API_URL;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.tokenStorage.getToken()
  });
  user: any;

  private userUpdateSource = new BehaviorSubject<any>(null);
  userUpdates = this.userUpdateSource.asObservable();

  constructor(
    private readonly http:HttpClient, private tokenStorage : TokenStorage , private router: Router
  ) { 
    this.startTokenCheck();
  }

  attemptAuth(formData:any) : any {
    const body = JSON.stringify(formData);
    console.log('attempAuth ::');
    return this.http.post(`${this.userUrl}token/generate-token`, body, {headers:authHeaders,observe:'response'});
  }



  getUser(id: number): Observable<any> {
    return this.http.get(`${this.userUrl}${id}` , {headers : this.headers});
  }

  getUserByName(username: any): Observable<any> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const encodedName = encodeURIComponent(username);
    const url = `${this.userUrl}users/search?name=${encodedName}`;
    return this.http.get(url, { headers });
  }

  updateUserDetails(userDetails: any) {
    this.userUpdateSource.next(userDetails);
  }

  private startTokenCheck(): void {
    setInterval(() => {
      if (!this.tokenStorage.isLoggedIn()) {
        this.router.navigate(['login']);
      }
    }, 60000); // Check every 60 seconds
  }
}
