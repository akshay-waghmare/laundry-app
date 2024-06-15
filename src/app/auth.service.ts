import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenStorage } from './token.storage';
import { environment } from 'src/environments/environment.prod';


const authHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userUrl = 'http://127.0.0.1:8099'; // Adjust the URL as needed

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.tokenStorage.getToken()
  });
  user: any;

  private userUpdateSource = new BehaviorSubject<any>(null);
  userUpdates = this.userUpdateSource.asObservable();

  constructor(
    private readonly http:HttpClient, private tokenStorage : TokenStorage
  ) { 

  }

  attemptAuth(formData:any) : any {
    const body = JSON.stringify(formData);
    console.log('attempAuth ::');
    return this.http.post(`${this.userUrl}/token/generate-token`, body, {headers:authHeaders,observe:'response'});
  }



  getUser(id: number): Observable<any> {
    return this.http.get(`${this.userUrl}/${id}` , {headers : this.headers});
  }

  getUserByName(username : any): Observable<any> {
    // Encode the name to handle special characters
    console.log(username);
    const encodedName = encodeURIComponent(username);
    // Append the query parameter to the URL
    const url = `${this.userUrl}/users/search?name=${encodedName}`;
    return this.http.get(url,{headers : this.headers});
  }

  updateUserDetails(userDetails: any) {
    this.userUpdateSource.next(userDetails);
  }
}
