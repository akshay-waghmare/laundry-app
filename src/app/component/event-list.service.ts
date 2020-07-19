import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventListService {

  private entity_url = environment.REST_API_URL + 'events';
  constructor( private _http: HttpClient) {
   }

   getEvents(): Observable<any> {
     return this._http.get(this.entity_url);
   }
}
