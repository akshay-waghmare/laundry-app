import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RxStompService } from '@stomp/ng2-stompjs';
import { AdminLayoutsModule } from '../../layouts/admin-layouts/admin-layouts.module';


@Injectable({
  providedIn: 'root'
})
export class TennisService {

  private upcoming_tennis_url = environment.REST_API_URL + 'tennis/tennis/tournaments';
  private inplay_tennis_url = environment.REST_API_URL + 'tennis/tennis/all';
  

  constructor(private _http: HttpClient,
    private rxStompService  : RxStompService ) { }

  getUpcomingTennisEvents() : Observable<any> {

    return this._http.get(this.upcoming_tennis_url);

  }

  getAllTennisEvents() : Observable<any> {

    return this._http.get(this.inplay_tennis_url);

  }



getInplayTennisEventsSocket() : Observable<any> {

  return this.rxStompService.watch('/topic/tennis.inplay');

}
}