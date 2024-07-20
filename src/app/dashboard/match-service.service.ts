import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private matchTeamsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public matchTeams$: Observable<any[]> = this.matchTeamsSubject.asObservable();

  constructor() {}

  getMatchTeams(): Observable<any[]> {
    return this.matchTeams$;
  }

  addMatchTeam(matchTeam: any): void {
    const currentMatchTeams = this.matchTeamsSubject.value;
    if (!currentMatchTeams.find(team => team.teamName === matchTeam.teamName)) {
      this.matchTeamsSubject.next([...currentMatchTeams, matchTeam]);
    }
  }

  removeMatchTeam(matchTeam: any): void {
    const currentMatchTeams = this.matchTeamsSubject.value.filter(team => team.teamName !== matchTeam.teamName);
    this.matchTeamsSubject.next(currentMatchTeams);
  }

  getAllMatches(): Observable<any[]> {
    const dummyMatches = [
      { id: 1, name: 'Match 1', winningTeam: 'Team A', losingTeam: 'Team B' },
      { id: 2, name: 'Match 2', winningTeam: 'Team C', losingTeam: 'Team D' },
      { id: 3, name: 'Match 3', winningTeam: 'Team E', losingTeam: 'Team F' }
    ];
    return of(dummyMatches);
  }

  getLiveMatches(): Observable<any[]> {
    const dummyLiveMatches = [
      { url: 'https://example.com/match/1', teamName: 'Team A vs Team B' },
      { url: 'https://example.com/match/2', teamName: 'Team C vs Team D' }
    ];
    return of(dummyLiveMatches);
  }

  getNotifications(): Observable<any[]> {
    const dummyNotifications = [
      { message: 'User 1 placed a bet on Match 1' },
      { message: 'User 2 placed a bet on Match 2' },
      { message: 'User 3 placed a bet on Match 3' }
    ];
    return of(dummyNotifications);
  }

  getBetsForMatch(matchId: number): Observable<any[]> {
    const dummyBets = [
      { potentialWin: 100, potentialLoss: -50 },
      { potentialWin: 150, potentialLoss: -75 }
    ];
    return of(dummyBets);
  }

  subscribeToEventsTopic(): Observable<any> {
    // For dummy data, we won't implement real WebSocket subscriptions
    return of(null);
  }
}
