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
    this.matchService.getMatchTeams().subscribe(data => {
      this.matches = data.map(match => ({
        ...match,
        totalPotentialWin: 0,
        totalPotentialLoss: 0,
        sessionExposures: {}
      }));

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
      });
      // For each match, load the bets and calculate the win/loss
    });

    /* this.matchService.getLiveMatches().subscribe(data => {
      if (Array.isArray(data)) {
        data.forEach((item: any) => {
          const url = item.url;
          this.extractAndSetURls(url);
        });
      }
    }); */
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
        const index = this.matchTeams.findIndex(team => team.url === urlToDelete);
        if (index > -1) {
          this.matchTeams.splice(index, 1);
        }
      }
    } else {
      this.addUrlList(message);
    }
  }

  private addUrlList(message: any) {
    const parts = message.split('/');
    const matchPart = parts[parts.length - 2];
    const matchTeam = matchPart.split('-').slice(0, 3).join(' ');

    if (!this.matchTeams.find(team => team.teamName === matchTeam)) {
      const teamObject = { url: message, teamName: matchTeam };
      this.matchTeams.push(teamObject);
    }
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
}
