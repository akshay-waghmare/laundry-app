import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventListService } from '../component/event-list.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('scrollContainer', { read: ElementRef }) scrollContainer!: ElementRef;
  liveMatches: any[] = [];

  constructor(
    private eventListService: EventListService, 
    private router: Router,
    private metaService: Meta,
    private titleService: Title
    ) { }

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
    const result1 = this.extractTeamAndTournament(url);
    console.log(`URL1 -> Team: ${result1.teamName}, Tournament: ${result1.tournamentName}`);
    const parts = url.split('/').slice(2); // Ignore the first empty part and 'scoreboard'

    //const date = '27 July'; // Assuming we have the date already or can derive it
    const title = result1.tournamentName;
    const description = `${parts[2].replace(/-/g, ' ')}`; // Create a description
    const teams = result1.teamName;

    const team1 = this.extractTeams(teams).team1;
    const team2 = this.extractTeams(teams).team2;

    const matchUrl =parts[5];
    //const startTime = '06:00 PM'; // Assuming we have the start time already or can derive it

    return {
      //date,
      title,
      description,
      team1,
      team2,
      matchUrl,
      //startTime
    };
  }

  navigateToMatch(match: any): void {

     // Dynamically update meta tags for the clicked match
    this.updateMetaTags(match);

    // Navigate to the match details page
    this.router.navigate(['cric-live', match.matchUrl]);
  }

  updateMetaTags(match: any): void {
    // Update page title dynamically
    this.titleService.setTitle(match.title);
  
    // Update meta description
    this.metaService.updateTag({ name: 'description', content: match.description });
  
    // Update meta keywords
    this.metaService.updateTag({ name: 'keywords', content: `${match.team1}, ${match.team2}, cricket match, live score, ${match.title}` });
  
    // Update Open Graph title
    this.metaService.updateTag({ property: 'og:title', content: match.title });
  
    // Update Open Graph description
    this.metaService.updateTag({ property: 'og:description', content: match.description });
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


 extractTeamAndTournament(url: string): { teamName: string | null, tournamentName: string | null } {
    // Regular expression to capture the part of the URL with team names and tournament name
    const pattern = /\/([a-z0-9\-]+)\/(live|scorecard)$/i;

    // Search for the pattern in the URL
    const match = url.match(pattern);

    if (match) {
        // The full match for the team names and tournament name
        const fullMatch = match[1];
        
        // Split on hyphens to separate the match details
        const parts = fullMatch.split('-');

        // Handle cases with team names and tournament name
        if (parts.length >= 5) {
            // Extract team names (everything before the first 'match')
            const teamPart = parts.slice(0, parts.indexOf('match') - 1).join('-');

            // Extract tournament name (everything after the 'match')
            const matchIndex = parts.indexOf('match');
            const tournamentName = parts.slice(matchIndex + 1).join('-');

            return { teamName: teamPart, tournamentName: tournamentName };
        }
    }

    return { teamName: null, tournamentName: null };
}

extractTeams(matchString: string): { team1: string, team2: string } | null {
  // Check if the match string contains the "-vs-" separator
  if (matchString.includes("-vs-")) {
      // Split the string at "-vs-" to get the two teams
      const teams = matchString.split("-vs-");

      // Ensure we have exactly two teams
      if (teams.length === 2) {
          return {
              team1: teams[0], // First team
              team2: teams[1]  // Second team
          };
      }
  }
  // Return null if the format is incorrect
  return null;
}

 extractTournamentName(matchString: string): string | null {
    // Define the pattern to match the 'match' part (e.g., 1st-match, 4th-match, etc.)
    const matchPattern = /\d{1,2}(st|nd|rd|th)-match/i;

    // Search for the matchPattern in the matchString
    const match = matchString.match(matchPattern);

    if (match) {
        // Extract everything after the matched "1st-match" or "4th-match" part
        const startIndex = match.index! + match[0].length; // Start after the match part
        const tournamentName = matchString.substring(startIndex + 1); // Extract the tournament name
        return tournamentName.trim(); // Return trimmed tournament name
    }

    // Return null if the pattern is not found
    return null;
}
}
