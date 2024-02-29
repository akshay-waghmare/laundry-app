import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { CricketService } from './cricket-odds.service';


@Component({
  selector: 'app-cricket-odds',
  templateUrl: './cricket-odds.component.html',
  styleUrls: ['./cricket-odds.component.css']
})
export class CricketOddsComponent implements OnInit, OnDestroy {

  team1Name: string = 'NA';
  team1Score: string = 'NA';
  team1Overs: string = 'NA';

  team2Name: string = 'NA';
  team2Score: string = 'NA';
  team2Overs: string = 'NA';


  favTeam: string = '-'
  liveScoreUpdate: string = 'Wait for Score'; // Example: "6 runs scored in the last over."
  backOdds: number = 0; // Example: Back odds for the favorite team.
  layOdds: number = 1; // Example: Lay odds for the favorite team.

  session: string = '-';
  sessionBackOdds: string = '-';
  sessionLayOdds: string = '-';

  showBetting: boolean = false; // Initially, hide betting options
  selectedOdds: number = 2.0; // Initial odds value
  betAmount: number = 0; // Initial bet amount
  oddsStep: number = 0.1; // Initial step value
  // Store the previous odds value
  prevOdds: number = this.selectedOdds;

  showBettingFor: string = ''; // To trac which section is clicked

  layButtonActive: boolean = false;

  currentMatchIndex: number | null = null; 

  private destroy$: Subject<void> = new Subject<void>();

  last6Balls: { score: number }[] = [{ score: 1 }, { score: 0 }, { score: 0 }, { score: 0 }, { score: 0 }, { score: 6 }]; // Example: Array to store last 6 ball scores.
  cricetTopicSubscription: any;
  cricObj: any;

  private tossWonCountrySubject: Subject<string> = new Subject<string>();
  private batOrBallSelectedSubject: Subject<string> = new Subject<string>();
  tossWonCountry: string;
  batOrBallSelected: string;
  testMatchOdds: any[];
  currentRunRate: any;
  finalResultTextValue: any;

  constructor(private rxStompService: RxStompService,
              private cricketService: CricketService,
              private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnDestroy() {
    this.tossWonCountrySubject.complete();
    this.batOrBallSelectedSubject.complete();

    // Unsubscribe from all subscriptions and subject
    this.destroy$.next();
    this.destroy$.complete();
    if (this.cricetTopicSubscription) {
      this.cricetTopicSubscription.unsubscribe();
    }
  }

  checkIfCountryAndOptionSet() {
    if (this.tossWonCountry && this.batOrBallSelected) {
      console.log('Country and option set');
    }
  }
  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$),
      switchMap(() => this.activatedRoute.params),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      // Unsubscribe from WebSocket subscription when the route changes
      if (this.cricetTopicSubscription) {
        this.cricetTopicSubscription.unsubscribe();
      }
      this.fetchCricketData();
    });

    this.tossWonCountrySubject.subscribe((tossWonCountry) => {
      this.tossWonCountry = tossWonCountry;
      // this.checkIfCountryAndOptionSet();
    });

    this.batOrBallSelectedSubject.subscribe((batOrBallSelected) => {
      this.batOrBallSelected = batOrBallSelected;
      // this.checkIfCountryAndOptionSet();
    });

    // Initialize or update the component properties here.
    // You can update liveScoreUpdate, backOdds, layOdds, and last6Balls based on real data.

    //watching live score for cricet data
    this.fetchCricketData();

  }
  


  private fetchCricketData() {
    this.activatedRoute.params.subscribe(params => {
      const match = params['path']; // Use 'path' instead of 'match'

      this.cricketService.getLastUpdatedData(match).subscribe(data => {
        this.parseCricObjData(data);
      });
      //watching live score for cricket data
      this.cricetTopicSubscription = this.rxStompService.watch(`/topic/cricket.${match}.*`).subscribe((data) => {
        this.parseCricObjData(data);
      });
    });
  }

  private parseCricObjData(data) {
    console.log(data);
    // Check if 'data' has a 'body' property
    if(data && 'body' in data){
      console.log('Subscribed to data:', data.body);
      this.cricObj = JSON.parse(data.body);
    } else {
      this.cricObj = data;
    }

    // Your existing logic for handling received cricket data...s
    if (this.cricObj) {
      // Check and handle the "team_odds" field
      if (this.cricObj.team_odds !== undefined && this.cricObj.team_odds !== null) {
        const teamOddsValue = this.cricObj.team_odds;
        this.backOdds = teamOddsValue.backOdds;
        this.layOdds = teamOddsValue.layOdds;
        console.log("Team Odds:", teamOddsValue);
      }


      if (this.cricObj.toss_won_country !== undefined) {
        this.tossWonCountrySubject.next(this.cricObj.toss_won_country);
      }

      if (this.cricObj.current_ball !== undefined) {
        this.liveScoreUpdate = this.cricObj.current_ball;
      }

      if (this.cricObj.session_odds !== undefined) {
        const session_odds = this.cricObj.session_odds;

        if (session_odds !== undefined && session_odds !== null) {
          this.session = session_odds.sessionOver + ' Over';
          this.sessionBackOdds = session_odds.sessionBackOdds;
          this.sessionLayOdds = session_odds.sessionLayOdds;
        }

        console.log("session_odds: ", session_odds);
      }
      if (this.cricObj.bat_or_ball_selected !== undefined) {
        const bat_or_ball_selected = this.cricObj.bat_or_ball_selected;
        this.batOrBallSelectedSubject.next(bat_or_ball_selected);
      }

      // Check and handle the "over" field
      if (this.cricObj.over !== undefined) {
        const overValue = this.cricObj.over;
        this.team1Overs = overValue;
        console.log("Over:", overValue);
      }

      if (this.cricObj.batting_team !== undefined) {
        const batting_team = this.cricObj.batting_team;
        this.team1Name = batting_team;
        console.log("Batting team:", batting_team);
      }

      // Check and handle the "score" field
      if (this.cricObj.score !== undefined) {
        const scoreValue = this.cricObj.score;
        this.team1Score = scoreValue;
        console.log("Score:", scoreValue);
      }

      // Check and handle the "team_player_info" field
      /* if (this.cricObj.team_player_info !== undefined) {
        const team_player_info = this.cricObj.team_player_info;
        console.log("team_player_info:", team_player_info);
        for (const country in team_player_info) {
          if (team_player_info.hasOwnProperty(country)) {
            const squad = team_player_info[country];
            const code = this.generateTeamCode(country);
            if (this.team1Name === 'NA') {
              this.team1Name = code;
            }
            else {
              this.team2Name = code;
            }
            console.log(`Country: ${country}`);
            console.log(`Squad: ${squad.join(', ')}`);
          }
        }

      } */
      // Check and handle the "current_ball" field
      if (this.cricObj.current_ball !== undefined) {
        const currentBallValue = this.cricObj.current_ball;
        const containsNumber = currentBallValue === 'Ball'; // change this to check 'Ball' string
        if (containsNumber)
          this.liveScoreUpdate = 'Ball Start';
        else if(currentBallValue === 'Stumps'){
          this.liveScoreUpdate = 'Stumps';
        }
        else
          this.liveScoreUpdate = currentBallValue;
        console.log("Current Ball:", currentBallValue);
      }

      // Check and handle the "runs_on_ball" field
      if (this.cricObj.runs_on_ball !== undefined && this.cricObj.runs_on_ball !== null) {
        const runsOnBallValue = this.cricObj.runs_on_ball;
        this.liveScoreUpdate = runsOnBallValue;
        console.log("Runs on Ball:", runsOnBallValue);
      }

      // Check and handle the "CRR" field
      if (this.cricObj.crr !== undefined && this.cricObj.crr !== null) {
        const currentRunRate = this.cricObj.crr;

        console.log("Crr:", currentRunRate);
        this.currentRunRate = currentRunRate;
        // crr === 'Crr not found' then set '';
        if (currentRunRate === 'CRR not found') {
          this.currentRunRate = '';
        }
        console.log("CRR :", this.currentRunRate);
        
      }

      // Check and handle the "final_result_text" field
      if (this.cricObj.final_result_text !== undefined && this.cricObj.final_result_text !== null) {
        const finalResultTextValue = this.cricObj.final_result_text;
        this.finalResultTextValue = finalResultTextValue;
        // if finalResultTextValue === 'Final result text not found' then set '';
        if (finalResultTextValue === 'Final result text not found') {
          this.finalResultTextValue = '';
        }
        console.log("Final Result Text:", this.finalResultTextValue);
      }

      //check and handle the "overs_data" field
      if (this.cricObj.overs_data !== undefined && this.cricObj.overs_data !== null) {
        const oversDataValue = this.cricObj.overs_data;
        const thisOverData = this.cricObj.overs_data.find(over => over.overNumber === "This Over:");
        if (thisOverData !== undefined) {
          // Prepare the last6Balls array with the data for "This Over"
          this.last6Balls = thisOverData.balls.map(ball => {
            return { score: ball.trim() }; // Adjust if your structure requires more than just the score
          }).filter(ball => ball.score !== "");
        }
        console.log("Overs Data:", oversDataValue);
      }

      // Check and handle the "runs_on_ball" field
      if (this.cricObj.match_odds !== undefined && this.cricObj.match_odds !== null) {
        const testMatchOddsValue = this.cricObj.match_odds;

        console.log("Test Match Odds:", testMatchOddsValue);
        this.testMatchOdds = testMatchOddsValue;
        console.log("Test Match Odds:", this.testMatchOdds);
        
      }

      // Check and handle the "fav_team" field
      if (this.cricObj.fav_team !== undefined && this.cricObj.fav_team !== null) {
        const favTeamValue = this.cricObj.fav_team;
        if (this.favTeam !== favTeamValue) {
          this.favTeam = favTeamValue;
        }
        console.log("Favorite Team:", favTeamValue);
      }
    } else {
      console.log("No cricket data received.");
    }
  }

  // Function to show betting options
  showBettingOptions(section) {

    this.showBetting = true;
    this.selectedOdds = this.backOdds;
    this.prevOdds = this.selectedOdds;

    this.showBettingFor = section;

    if (this.showBettingFor == 'teamSectionBackOdds' || this.showBettingFor === 'sessionBackOdds') {
      if (this.layButtonActive) {
        this.layButtonActive = false;
      }
    }

  }

  //Function to generate team code from team name
  generateTeamCode(teamName: string): string {
    const words = teamName.split(" ");
    let code = "";

    if (words.length === 1) {
      code = words[0].substring(0, 2).toUpperCase();
    } else if (words.length === 2) {
      code = words.map((word) => word[0]).join("").toUpperCase();
    } else {
      // Handle other cases as needed
      code = "NA";
    }

    return code;
  }

  // Function to cancel the bet
  cancelBet() {
    this.showBetting = false;
    if (this.layButtonActive) {
      this.layButtonActive = false;
    }
  }

  // Function to place the bet (you can add your logic here)
  placeBet() {
    // Add your logic to handle the bet placement here
    console.log('Placing bet...');
    console.log('Selected Odds: ', this.selectedOdds);
    console.log('Bet Amount: ', this.betAmount);
  }

  updateOddsStep() {
    if (this.selectedOdds > this.prevOdds) {
      // Incrementing odds
      this.oddsStep = this.selectedOdds > 9 ? 1 : 0.1;

    } else if (this.selectedOdds < this.prevOdds) {
      // Decrementing odds
      this.oddsStep = this.selectedOdds > 9 ? -1 : -0.1;
    } else {
      // No change in odds
      this.oddsStep = 0.1;
      return;
    }

    this.selectedOdds = this.prevOdds + this.oddsStep;
    this.selectedOdds = Number(this.selectedOdds.toFixed(1));
    // Update the previous odds value
    this.prevOdds = this.selectedOdds;
  }

  handleOddsBlur() {
    this.selectedOdds = parseFloat(this.selectedOdds.toFixed(1));
  }
  handleOddsInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.selectedOdds = parseFloat(inputValue);
  }

  // Function to toggle the active state of the "lay" button
  toggleLayButton() {
    this.layButtonActive = true;
  }

  // Example modification of the showBettingOptions method to accept match context
  // overload this showBettingOptions method to accept match context
    
  showBettingOptionsForTestMatch(section:string,  index: number) {
    this.showBetting = true;
    // If it's a test match, set the selected odds and amount based on the match parameter
    this.currentMatchIndex = index; // Set the current match index
    const match = this.testMatchOdds[index]; // Access the match using the index

    if (match) {
      this.selectedOdds = match.selectedOdds;
      this.betAmount = match.betAmount;
    } else {
      // For the favorite team or session, keep the existing logic
      this.selectedOdds = this.backOdds;
    }
    this.showBettingFor = section;
    // Additional logic to handle the lay button state...
  }

}
