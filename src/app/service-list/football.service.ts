import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RxStompService } from '@stomp/ng2-stompjs';
import { AdminLayoutsModule } from '../layouts/admin-layouts/admin-layouts.module';

@Injectable({
  providedIn: 'root'
})
export class FootballService {

  private upcoming_football_url = environment.REST_API_URL + 'events/football/upcoming';
  private inplay_football_url = environment.REST_API_URL + 'events/football/inplay';


  constructor(private _http: HttpClient,
              private rxStompService  : RxStompService) { }

  getUpcomingFootballEvents() : Observable<any> {

    return this._http.get(this.upcoming_football_url);

  }
  
  getInplayFootballEvents() : Observable<any> {

    return this._http.get(this.inplay_football_url);

  }

  getInplayFootballEventsSocket() : Observable<any> {

    return this.rxStompService.watch('/topic/football.inplay');

  }
}
