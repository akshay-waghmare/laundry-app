import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullerServiceService {
  private entity_url = environment.REST_API_URL + 'events';
  constructor(private _http: HttpClient) { }

  getMarketListByEvent(eventId, isInplay): Observable<any> {
    return this._http.get(this.entity_url + '/' + eventId + '/inplay' + '/' + isInplay);
  }
}
