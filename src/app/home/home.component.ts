/* import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { EventListService } from '../component/event-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

 
export class HomeComponent implements OnInit{
  ngOnInit(): void {
    this.eventListService.getLiveMatches().subscribe(data => {
      if (Array.isArray(data)) {
        const dataArray = data;
        console.log(dataArray);
        dataArray.forEach((item: any) => {
          const url = item.url;
          // Do something with the url
          console.log(url);
          
        });
      }
    });

  }

  constructor(private eventListService: EventListService,
   ) { }

  @ViewChild('scrollContainer', { read: ElementRef }) scrollContainer!: ElementRef;
  matches = [
    {
      date: '26 July',
      title: 'W-Asia Cup 2024',
      description: '1st Semi-Final, Rangiri Dambulla International Stadium...',
      team1: 'India Women',
      team2: 'Bangladesh Women',
      startTime: '02:00 PM'
    },
    {
      date: '1 Sep',
      title: 'W-T20 WC QLF 2023',
      description: '6th Match, Bayreans Oval',
      team1: 'Thailand Women',
      team2: 'Myanmar Women',
      startTime: '09:00 AM'
    },
    {
      date: '26 July',
      title: 'W-Asia Cup 2024',
      description: '2nd Semi-Final, Rangiri Dambulla International Stadium...',
      team1: 'Sri Lanka Women',
      team2: 'Pakistan Women',
      startTime: '07:00 PM'
    },
    {
      date: '15 Aug',
      title: 'W-T20 WC QLF 2023',
      description: '12th Match, Sydney Cricket Ground',
      team1: 'Australia Women',
      team2: 'New Zealand Women',
      startTime: '05:30 PM'
    },
    {
      date: '18 Sep',
      title: 'W-T20 WC QLF 2023',
      description: 'Final Match, Melbourne Cricket Ground',
      team1: 'England Women',
      team2: 'South Africa Women',
      startTime: '03:00 PM'
    },
    {
      date: '10 Oct',
      title: 'W-Test Series 2023',
      description: '3rd Test, Lord\'s Cricket Ground',
      team1: 'West Indies Women',
      team2: 'India Women',
      startTime: '10:30 AM'
    }
  ];

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}


 */


import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventListService } from '../component/event-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('scrollContainer', { read: ElementRef }) scrollContainer!: ElementRef;
  liveMatches: any[] = [];

  constructor(private eventListService: EventListService) { }

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
    //const startTime = '06:00 PM'; // Assuming we have the start time already or can derive it

    return {
      //date,
      title,
      description,
      team1: this.formatTeamName(teams[0]),
      team2: this.formatTeamName(teams[1].split('-')[0].toUpperCase()),
      //startTime
    };
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
