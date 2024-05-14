import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorage } from '../token.storage';

@Injectable({
  providedIn: 'root'
})
export class CricketService {

  private lastUpdatedCricketData = environment.REST_API_URL + 'cricket-data';
  private  placeBetEndpoint = environment.REST_API_URL + 'cricket-data/' + 'placeBet';
  private  getAllbetsFormatch = environment.REST_API_URL + 'cricket-data/' + 'bets/';
  

  constructor(private http: HttpClient , private tokenStorage:TokenStorage,
     ) { }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.tokenStorage.getToken()
  });

  getLastUpdatedData(url: string): Observable<any> {
    return this.http.get<any>(`${this.lastUpdatedCricketData}/last-updated-data?url=${url}`);
  }

  placeBet(betDetails: any): Observable<any> {
    return this.http.post<any>(this.placeBetEndpoint, betDetails , {headers:this.headers});
  }

  getUserBetsForMatch(matchUrl: any): Observable<any> {
    return this.http.get<any>(`${this.getAllbetsFormatch}?url=${matchUrl}`, {headers: this.headers});
  }

}