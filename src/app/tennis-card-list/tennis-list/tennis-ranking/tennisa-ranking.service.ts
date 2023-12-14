import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TennisaRankingService {

  private atpranking_tennis_url = environment.REST_API_URL + 'tennis/tennis/atp/ranking';
  
  private wtaranking_tennis_url = environment.REST_API_URL + 'tennis/tennis/wta/ranking';
  
  

  constructor(private _http: HttpClient,
              ) { }

  getTennisAtpRankingEvents() : Observable<any> {

    return this._http.get(this.atpranking_tennis_url);

  }

  getTennisWtaRankingEvents() : Observable<any> {

    return this._http.get(this.wtaranking_tennis_url);

  }
}
