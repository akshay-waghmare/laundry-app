import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RxStompService } from '@stomp/ng2-stompjs';
import { map } from 'rxjs/operators';
import { N_ROUTES } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class EventListService {
  
  
  private live_matches_url = environment.REST_API_URL + 'cricket-data/' + 'live-matches';
  private entity_url = environment.REST_API_URL + 'events';
  constructor(private _http: HttpClient, private rxStompService: RxStompService) {
  }
  
  getUserBetsForMatch(matchUrl: any) {
    throw new Error('Method not implemented.');
  }
  getEvents(): Observable<any> {
    return this._http.get(this.entity_url);
  }

  getLiveMatches() {
    return this._http.get(this.live_matches_url);
  }

  subscribeToEventsTopic(): Observable<any> {
    return this.rxStompService.watch('/topic/live-matches');
  }

  subscribeToBetStatusTopic(): Observable<any> {
    return this.rxStompService.watch('/topic/bet-status');
  }

  /// this url will be sent to the backend to activate the scraping logic for the new match
  sendLinkToBackend(urlToSend: String) {
    //post request to the backend with the url as payload
    return this._http.post(environment.REST_API_URL + 'cricket-data/' + 'scrape-live-match', { url: urlToSend });
  }

  getResultsWithIcons() {
    return this.getEvents().pipe(
      map(data => {
        return data.map(({ id, name }) => {
          const entry = N_ROUTES.filter(x => x.title === name);
          const icon = entry[0]['icon'];
          return ({ id, name, title: name, icon: icon, path: entry[0]['path'] });
        });
      })
    );
  }
}
