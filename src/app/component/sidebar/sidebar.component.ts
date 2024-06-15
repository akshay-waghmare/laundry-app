import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { EventListService } from '../event-list.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { N_ROUTES } from 'src/app/constants/constants';
import { ROUTES } from 'src/app/constants/constants';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit, OnDestroy {

  menuItems: any[];
  results: any[];
  matchTeams: any[] = [];
  eventlistSubscription: Subscription;

  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private eventListService: EventListService,
              private sidebarService: SidebarService,
              private router: Router) { }


  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    this.eventListService.getResultsWithIcons().subscribe(data => {
      this.results = data;
      console.log(this.results);
    });

    this.eventListService.getLiveMatches().subscribe(data => {
      if (Array.isArray(data)) {
        const dataArray = data;
        console.log(dataArray);
        dataArray.forEach((item: any) => {
          const url = item.url;
          // Do something with the url
          console.log(url);
          this.extractAndSetURls(url);
        });
      }
    });

    console.log(this.results);

    // Subscribe to WebSocket updates
    this.eventlistSubscription = this.eventListService.subscribeToEventsTopic().subscribe(newMatchUrl => {
      this.extractAndSetURls(newMatchUrl);
    });

  }

  ngOnDestroy(): void {
    this.eventlistSubscription.unsubscribe();
  }

  private extractAndSetURls(message: any) {
    console.log('New match URL received:', message);
    // check if message is a variable of FramImpl class
    
    if (message.hasOwnProperty('isBinaryBody')) {
      message = JSON.parse(message.body);
      if (message.hasOwnProperty('url')) {
        // Handle new or existing match logic 
        const newMatchUrl = message.url;
        this.addUrlList(newMatchUrl);

      } else if (message.hasOwnProperty('status') && message.status === 'deleted') {
        // Deletion Handling
        const urlToDelete = message.url;
        // Your logic to extract  matchTeam for UI link removal - you might need a minor 
        // adjustment   if a 'matchPart'  alone in your logic doesn't uniquely identify.

        // Removal from array if you're  only displaying  links using  'matchTeams' alone
        const index = this.matchTeams.indexOf(urlToDelete, 0);
        if (index > -1) {
          this.matchTeams.splice(index, 1); // Remove using the computed index of 'matchTeam'
        }
      }
    }
    else {
      this.addUrlList(message);
    }
  }

  private addUrlList(message: any) {

    const parts = message.split('/');
    const matchPart = parts[parts.length - 2];
    const matchTeam = matchPart.split('-').slice(0, 3).join(' ');

    // Check if it's already present to avoid duplicates
    if (!this.matchTeams.find(team => team.teamName === matchTeam)) {
      // Before pushing this matchTeam to the array, it should be an object with the URL and the team name

      const teamObject = { url: message, teamName: matchTeam } as { url: string; teamName: string };
      this.matchTeams.push(teamObject);

    }
  }
  private sendLinkToBackend(urlToSend: string) {
    // Split the URL into parts based on the '/' delimiter
    const parts = urlToSend.split('/');

    // Get the second-to-last part of the URL
    const matchPart = parts[parts.length - 2];

    // Navigate to the 'cric-live' route with the extracted matchPart as a parameter
    this.router.navigate(['cric-live', matchPart]);
  }

  toggle() {
    console.log('Toggle button clicked'); // Add console log
    this.sidebarService.toggleVisibility();
  }
  
} 