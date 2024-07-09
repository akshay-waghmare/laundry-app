import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenStorage } from './token.storage';
import { environment } from 'src/environments/environment';

interface UserDto {
  username: string;
  password: string;
  balance: number;
  exposure: number;
  role: string;
}


const authHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userUrl = environment.REST_API_URL;

  //private baseUrl = this.userUrl||'http://your-backend-url.com';  

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.tokenStorage.getToken()
  });
  user: any;

  private userUpdateSource = new BehaviorSubject<any>(null);
  userUpdates = this.userUpdateSource.asObservable();

  constructor(
    private readonly http:HttpClient, 
    private tokenStorage : TokenStorage
  ) { }

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

  signUp(user: UserDto): Observable<any> {
    return this.http.post(`${this.userUrl}signup`, user);
  }

}
