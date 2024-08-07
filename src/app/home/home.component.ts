import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventListService } from '../component/event-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('scrollContainer', { read: ElementRef }) scrollContainer!: ElementRef;
  liveMatches: any[] = [];

  constructor(private eventListService: EventListService, private router: Router) { }

  ngOnInit(): void {
    this.eventListService.getLiveMatches().subscribe(data => {
      if (Array.isArray(data)) {
        data.forEach((item: any) => {
          const url = item.url;
          const match = this.parseLiveMatchUrl(url);
          this.liveMatches.push(match);
        });
        console.log(this.liveMatches);
      }
    });
  }

  parseLiveMatchUrl(url: string) {
    const parts = url.split('/').slice(2); // Ignore the first empty part and 'scoreboard'

    //const date = '27 July'; // Assuming we have the date already or can derive it
    const title = parts[5].split('-').slice(-3).join('-');
    const description = `${parts[2].replace(/-/g, ' ')}`; // Create a description
    const teams = parts[5].split('-vs-');
    const matchUrl =parts[5];
    //const startTime = '06:00 PM'; // Assuming we have the start time already or can derive it

    return {
      //date,
      title,
      description,
      team1: this.formatTeamName(teams[0]),
      team2: this.formatTeamName(teams[1].split('-')[0].toUpperCase()),
      matchUrl,
      //startTime
    };
  }

  navigateToMatch(match: any): void {
    this.router.navigate(['cric-live', match.matchUrl]);
  }

  private formatTeamName(team: string): string {
    return team.toUpperCase();
  }

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
