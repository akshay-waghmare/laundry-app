import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const authHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http:HttpClient
  ) { }

  attemptAuth(formData:any) : any {
    const body = JSON.stringify(formData);
    console.log('attempAuth ::');
    return this.http.post('http://localhost:8090/token/generate-token', body, {headers:authHeaders,observe:'response'});
  }
}
