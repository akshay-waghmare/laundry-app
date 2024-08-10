import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorage } from '../token.storage';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeService {

  private apiUrl = environment.REST_API_URL + 'account/change-password';

  constructor(private http: HttpClient , private tokenStorage:TokenStorage,
  ) { }

private headers = new HttpHeaders({
 'Content-Type': 'application/json',
 'Authorization': 'Bearer ' + this.tokenStorage.getToken()
});


  

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(this.apiUrl, { currentPassword, newPassword },{headers: this.headers});
  }
}

