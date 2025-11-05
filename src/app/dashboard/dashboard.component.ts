import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatchService } from './match-service.service';
import { CricketService } from '../cricket-odds/cricket-odds.service';
import { EventListService } from '../component/event-list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  matches: any[] = [];
  notifications: any[] = [];
  matchTeams: any[] = [];
  private eventlistSubscription: Subscription;
  betStatusSubscription: Subscription;

  constructor(
    private matchService: MatchService,
    private cricketService:CricketService,
    private eventListService: EventListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMatches();
    this.loadNotifications();

    // Subscribe to WebSocket updates
    this.eventlistSubscription = this.matchService.subscribeToEventsTopic().subscribe(newMatchUrl => {
      if (newMatchUrl) {
        this.extractAndSetURls(newMatchUrl);
      }
    });

    // Subscribe to WebSocket updates for bet status
    this.betStatusSubscription = this.eventListService.subscribeToBetStatusTopic().subscribe(betStatus => {
      if (betStatus) {
        let message;
        if (betStatus.body) {
          message =  JSON.parse(betStatus.body);
        } 

        this.handleBetStatusUpdate(message);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.eventlistSubscription) {
      this.eventlistSubscription.unsubscribe();
    }
  }

  private loadMatches(): void {
    // Subscribe to match teams - this will update whenever matches are added
    this.matchService.getMatchTeams().subscribe(data => {
      console.log('Match teams updated:', data);
      this.matches = data.map(match => ({
        ...match,
        totalPotentialWin: 0,
        totalPotentialLoss: 0,
        sessionExposures: {}
      }));

      if (this.matches.length > 0) {
        this.cricketService.getUserBetsForMatchNonUserBased().subscribe(data => {

          console.log("data for all match bets" , data);
          this.matches.forEach(match => {
            if (data[match.url]) {
              const betsData = data[match.url];
              match.totalPotentialWin = this.calculateTotalPotentialWin(betsData.adjustedExposures);
              match.totalPotentialLoss = this.calculateTotalPotentialLoss(betsData.adjustedExposures);
              match.sessionExposures = betsData.sessionExposures;
              this.setWinningAndLosingTeams(match, betsData.adjustedExposures);
            }
          });
        }, error => {
          console.log('Could not load bet data:', error);
        });
      }
    });

    // Load live matches from backend
    this.loadLiveMatchesFromBackend();
  }

  loadLiveMatchesFromBackend(): void {
    this.eventListService.getLiveMatches().subscribe(data => {
      console.log('Live matches from backend:', data);
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item: any) => {
          const url = item.url;
          this.extractAndSetURls(url);
        });
      } else {
        console.log('No live matches returned from backend');
      }
    }, error => {
      console.log('Backend not available, loading dummy matches', error);
      // If backend is not available, load some dummy matches for testing
      this.loadDummyMatches();
    });
  }

  private loadDummyMatches(): void {
    // Add some dummy matches for local development testing
    const dummyUrls = [
      'https://example.com/cricket-match/india-vs-australia-t20/match-1',
      'https://example.com/cricket-match/england-vs-pakistan-odi/match-2',
      'https://example.com/cricket-match/south-africa-vs-new-zealand-test/match-3'
    ];

    dummyUrls.forEach(url => {
      this.extractAndSetURls(url);
    });
  }

  private handleBetStatusUpdate(betStatus: any): void {
    this.notifications.unshift(betStatus);  // Add the new bet status to the top of the notifications list

    if (this.notifications.length > 10) {
      this.notifications.pop();
    }
    // Update matches with the latest bet data
    this.loadMatches();
  }
  
  private loadNotifications(): void {
    this.matchService.getNotifications().subscribe(data => {
      //this.notifications = data;
      
    });
  }

  private extractAndSetURls(message: any) {
    console.log('New match URL received:', message);

    if (message.hasOwnProperty('isBinaryBody')) {
      message = JSON.parse(message.body);
      if (message.hasOwnProperty('url')) {
        const newMatchUrl = message.url;
        this.addUrlList(newMatchUrl);
      }

      if (message.hasOwnProperty('status') && message.status === 'deleted') {
        const urlToDelete = message.url;
        const teamToRemove = { url: urlToDelete, teamName: '' };
        this.matchService.removeMatchTeam(teamToRemove);
      }
    } else {
      this.addUrlList(message);
    }
  }

  private addUrlList(message: any) {
    const parts = message.split('/');
    const matchPart = parts[parts.length - 2];
    const matchTeam = matchPart.split('-').slice(0, 3).join(' ');

    const teamObject = { url: message, teamName: matchTeam };
    
    console.log('Adding match:', teamObject);
    // Add to MatchService so it's available to the subscription
    this.matchService.addMatchTeam(teamObject);
  }

  viewMatchDetails(matchId: string): void {
    this.router.navigate(['/cricket-odds', matchId]);
  }

  private calculateTotalPotentialWin(exposures: any): number {
    let totalWin = 0;
    const teams = this.extractTeamsFromExposures(exposures);
  
    if (teams.length > 0) {
      const team = teams[0]; // Consider the first team in the list
      const winKey = `${team} Adjusted Win`;
  
      if (exposures[winKey] !== undefined) {
        totalWin = exposures[winKey];
      }
    }
  
    return totalWin;
  }

  private calculateTotalPotentialLoss(exposures: any): number {
    let totalLoss = 0;
    const teams = this.extractTeamsFromExposures(exposures);
  
    if (teams.length > 0) {
      const team = teams[0]; // Consider the first team in the list
      const loseKey = `${team} Adjusted Lose`;
  
      if (exposures[loseKey] !== undefined) {
        totalLoss = exposures[loseKey];
      }
    }
  
    return totalLoss;
  }

  private setWinningAndLosingTeams(match: any, exposures: any): void {
    const teams = this.extractTeamsFromExposures(exposures);
  
    if (teams.length > 0) {
      const team = teams[0]; // Consider the first team in the list
      const winKey = `${team} Adjusted Win`;
      const loseKey = `${team} Adjusted Lose`;
  
      if (exposures[winKey] !== undefined) {
        match.winningTeam = team;
      }
      if (exposures[loseKey] !== undefined) {
        match.losingTeam = team;
      }
    }
  }

  private extractTeamsFromExposures(exposures: any): string[] {
    const teams = new Set<string>();
  
    for (const key in exposures) {
      if (key.includes("Adjusted Win") || key.includes("Adjusted Lose")) {
        const team = key.replace(" Adjusted Win", "").replace(" Adjusted Lose", "");
        teams.add(team);
      }
    }
  
    return Array.from(teams);
  }

  clearNotifications(): void {
    this.notifications = [];
  }

  refreshMatches(): void {
    console.log('Refreshing matches...');
    // Clear existing matches first
    this.matchService.clearAllMatches();
    this.matches = [];
    // Reload from backend
    this.loadLiveMatchesFromBackend();
  }
}
