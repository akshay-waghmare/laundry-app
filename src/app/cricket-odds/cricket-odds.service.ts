import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorage } from '../token.storage';

@Injectable({
  providedIn: 'root'
})
export class CricketService {
  private entity_bet_history = environment.REST_API_URL + 'cricket-data/'+'bet/history';
  private profitLossEndpoint = environment.REST_API_URL + 'cricket-data/'+'bet/profit-loss';
  private lastUpdatedCricketData = environment.REST_API_URL + 'cricket-data';
  private  placeBetEndpoint = environment.REST_API_URL + 'cricket-data/' + 'placeBet';
  private  getAllbetsFormatch = environment.REST_API_URL + 'cricket-data/' + 'bets/';
  private  getAllbetsFormatchNonUserBased = environment.REST_API_URL + 'cricket-data/' + 'get-match-bet-with-exposure/';
  

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

  getUserBetsForMatchNonUserBased(): Observable<any> {
    return this.http.get<any>(this.getAllbetsFormatchNonUserBased, {headers: this.headers});
  }

  getUserBetHistory(): Observable<any> {
    return this.http.get(this.entity_bet_history, { headers: this.headers });
  }

  getProfitLoss(startDate: Date, endDate: Date): Observable<any> {
    const startOfDay = this.getStartOfDay(startDate).toISOString();
    const endOfDay = this.getEndOfDay(endDate).toISOString();
    let params = new HttpParams().set('startDate', startOfDay).set('endDate', endOfDay);
    return this.http.get(this.profitLossEndpoint, { headers: this.headers, params: params });
  }

  getStartOfDay(date: Date): Date {
    if (!date || isNaN(date.getTime())) {
      return new Date();
    }
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    return start;
  }

  getEndOfDay(date: Date): Date {
    if (!date || isNaN(date.getTime())) {
      return new Date();
    }
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return end;
  }

}