import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BetMarketService {

  private entity_url = environment.REST_API_URL + 'market';

  constructor(private _http: HttpClient) { }

  getBetMarketByMarketId(marketId): Observable<any > {
    return this._http.get(this.entity_url + '/' + marketId);
  }
}
