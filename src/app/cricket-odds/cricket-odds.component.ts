import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil, timeout } from 'rxjs/operators';
import { CricketService } from './cricket-odds.service';
import { TokenStorage } from '../token.storage';
import { EventListService } from '../component/event-list.service';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';

interface FormattedExposure {
  win: number;
  lose: number;
}

interface Bet {
  teamName: string;
  betType: string;
  amount: number;
  odd: number;
  isSessionBet: boolean;
  sessionName: string;
  matchUrl: string;
}

@Component({
  selector: 'app-cricket-odds',
  templateUrl: './cricket-odds.component.html',
  styleUrls: ['./cricket-odds.component.css']
})
export class CricketOddsComponent implements OnInit, OnDestroy {

  formattedExposures: Record<string, FormattedExposure> = {};
  sessionOddsListDisplay: Array<{ session: string, backOdds: string, layOdds: string }> = [];
  batsmanDataList: Array<any> = [];
  bowlerDataList: Array<any> = [];

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
  selectedOdds: number = 0; // Initial odds value
  betAmount: number = 0; // Initial bet amount
  oddsStep: number = 0.1; // Initial step value
  // Store the previous odds value
  prevOdds: number = this.selectedOdds;

  showBettingFor: string = ''; // To trac which section is clicked

  layButtonActive: boolean = false;

  selectedBetType: string = ''; // Initialize as 'back' or 'lay' based on user selection


  currentMatchIndex: number | null = null; 

  displayedColumns: string[] = ['teamName','type','amount', 'odd', 'status']; // Add more column names here

  quickStakeAmounts: number[] = [50, 100, 500, 1000, 1500, 2000, 2500, 3000]; // Define your quick stake amounts


  private destroy$: Subject<void> = new Subject<void>();

  totalPotentialWin: number = 0;
  totalPotentialLoss: number = 0;
  winFormattedKey: string = '';
  loseFormattedKey: string = '';
  
  matchInfo: any;
  scorecardData: any;

  last6Balls: { score: number }[] = [{ score: 0 }, { score: 0 }, { score: 0 }, { score: 0 }, { score: 0 }, { score: 0 }]; // Example: Array to store last 6 ball scores.
  cricetTopicSubscription: any;
  cricObj: any;

  private tossWonCountrySubject: Subject<string> = new Subject<string>();
  private batOrBallSelectedSubject: Subject<string> = new Subject<string>();
  tossWonCountry: string;
  batOrBallSelected: string;
  testMatchOdds: any[];
  currentRunRate: any;
  finalResultTextValue: any;
  betType: string;
  loggedUser: string;
  matchUrl: any;
  isBetProcessing: boolean;
  betStatusSubscription: any;

  userBets: any[] = []; // To store the bets
  updatedUserData: any;
  battingTeam: any;
  sessionExposures: any;

  // Property to hold the match URL
  currentUrl: string;



  teamComparisonKeys: string[] = [];
  teamComparisonSubKeys: string[] = [];
  venueStatsKeys: string[] = [];
  playingXIKeys: string[] = [];
  teamFormKeys: string[] = [];
  bowlFirstPercentage: number;
  winBatFirstPercentage: number;
  winBowlFirstPercentage: number;
  scorecardInfo: any;


  constructor(private rxStompService: RxStompService,
              private cricketService: CricketService,
              private tokenStorage:TokenStorage,
              private snackBar: MatSnackBar,
              private eventListService:EventListService,
              private authService : AuthService,
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
  // Function to show toast message
  showToast(message: string, action: string, duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }
  ngOnInit(): void {
    this.currentUrl = this.activatedRoute.snapshot.queryParamMap.get('url') || this.activatedRoute.snapshot.params['url'];

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

    //fetch user details from tokenStorage
    const user = this.tokenStorage.getUser();
    this.loggedUser =  JSON.parse(user);

    //this.loadUserBets();

  }
  


  private fetchCricketData() {
    this.activatedRoute.params.subscribe(params => {
      const match = params['path']; // Use 'path' instead of 'match'
      this.matchUrl = match;

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
      
      if (this.cricObj.batsman_data !== undefined && Array.isArray(this.cricObj.batsman_data)) {
        const batsmanData = this.cricObj.batsman_data;
  
        // Initialize arrays to store batsman and bowler data
        this.batsmanDataList = [];
  
        // Iterate through the batsman_data array
        if (this.cricObj.batsman_data && Array.isArray(this.cricObj.batsman_data)) {
          const batsmanData = this.cricObj.batsman_data;
    
          this.batsmanDataList = [];
    
          batsmanData.forEach(playerInfo => {
            if (!playerInfo.name.includes('Unknown')) { // Skip if the name contains 'Unknown'
              const strikeRate = (playerInfo.score / playerInfo.ballsFaced) * 100; // Strike rate calculation
                this.batsmanDataList.push({
                    name: playerInfo.name,
                    score: playerInfo.score,
                    ballsFaced: playerInfo.ballsFaced,
                    fours: playerInfo.fours,
                    sixes: playerInfo.sixes,
                    strikeRate: strikeRate.toFixed(2),
                    onStrike: playerInfo.onStrike
                });
            }
        });
    
          console.log("Parsed Batsman Data List:", this.batsmanDataList);
        }

  
        // Log the batsman and bowler data for debugging
        console.log("Parsed Bowler Data List:", this.bowlerDataList);
      }

      if (this.cricObj.bowler_data !== undefined && Array.isArray(this.cricObj.bowler_data)) {
        const bowlerData = this.cricObj.bowler_data;

        this.bowlerDataList = [];
  
        // Initialize arrays to store batsman and bowler data
        bowlerData.forEach(playerInfo => {
          if (!playerInfo.name.includes('Unknown')) { // Skip if the name contains 'Unknown'

              const ballsBowled = playerInfo.ballsBowled;
              const oversBowled = Math.floor(ballsBowled / 6); // Full overs
              const ballsInCurrentOver = ballsBowled % 6; // Remaining balls in current over
              const oversDisplay = `${oversBowled}.${ballsInCurrentOver}`; // Display as 'x.y' where y is the number of balls
              const economyRate = playerInfo.score / oversBowled; // Economy rate calculation
              this.bowlerDataList.push({
                  name: playerInfo.name,
                  score: playerInfo.score,
                  ballsBowled: oversDisplay,
                  economyRate: economyRate.toFixed(2),
                  wicketsTaken:playerInfo.wicketsTaken,
                  dotBalls:playerInfo.dotBalls
              });
          }
      })
        
        console.log("Parsed Bowler Data List:", this.bowlerDataList);
      }
      
      if (this.cricObj.session_odds !== undefined) {
        const sessionOddsList = this.cricObj.session_odds;
  
        if (Array.isArray(sessionOddsList) && sessionOddsList.length > 0) {
          this.sessionOddsListDisplay = this.cricObj.session_odds.sort((a, b) => {
            // Parse sessionOver as a number and sort by ascending order
            return Number(a.sessionOver) - Number(b.sessionOver);
          });
          this.sessionOddsListDisplay = sessionOddsList.map((sessionOdds) => ({
            session: sessionOdds.sessionOver + ' Over',
            backOdds: sessionOdds.sessionBackOdds,
            layOdds: sessionOdds.sessionLayOdds
          }));

        }
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
        this.battingTeam = batting_team;
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

    this.showBetting = false;
  this.layButtonActive = false;
  this.selectedOdds = 0;
  this.betAmount = 0;
  this.showBettingFor = '';



    this.showBetting = true;
    this.selectedOdds = this.backOdds;
    this.prevOdds = this.selectedOdds;

    this.showBettingFor = section;

    this.betAmount = 0; // Clear the stakes when clicking on odds again


    if (this.showBettingFor == 'teamSectionBackOdds' || this.showBettingFor === 'sessionBackOdds') {
      if (this.layButtonActive) {
        this.layButtonActive = false;
      }
    }

    if (this.showBettingFor == 'teamSectionBackOdds') {
      this.selectedBetType = 'back';
      this.selectedOdds = this.backOdds;
    }

    if (this.showBettingFor == 'layOdds') {
      this.selectedBetType = 'lay';
      this.layButtonActive = true;
      this.selectedOdds = this.layOdds;
    }

    if (this.showBettingFor =='sessionBackOdds') {
      this.selectedBetType = 'no';
      this.selectedOdds = Number(this.sessionBackOdds);
    }

    if(this.showBettingFor == 'sessionLayOdds'){
      this.layButtonActive = true;
      this.selectedBetType = 'yes';
      this.selectedOdds = Number(this.sessionLayOdds);
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
    this.showBettingFor = '';
    if (this.layButtonActive) {
      this.layButtonActive = false;
    }
  }

  resetBettingState() {
    this.showBetting = false;
    this.layButtonActive = false;
    this.selectedOdds = 0;
    this.prevOdds = 0;
    this.selectedBetType = '';
    this.betAmount = 0;
  }
  // Function to place the bet (you can add your logic here)
  placeBet() {

    const betDetails = {
      betType: this.selectedBetType,
      teamName: this.favTeam,
      odd: 1 + (Number(this.selectedOdds)/100),
      amount: Number(this.betAmount),
      matchUrl: this.matchUrl // Adding the match url to betDetails
    };
    // Add your logic to handle the bet placement here

    this.showBetting = false;
    this.isBetProcessing = true;
    
    console.log('Placing bet...');
    console.log('Selected Odds: ', this.selectedOdds);
    console.log('Bet Amount: ', this.betAmount);

    this.cricketService.placeBet(betDetails).pipe(timeout(10000)).subscribe({
      next: (response: any) => {
        console.log('Bet response received for match bet', response);
        
        // Assuming response.bet contains the bet object
        if (response.bet) {
          const bet = response.bet;
    
          if (bet.status === "Confirmed") {
            this.showToast('Bet placed and confirmed!', 'Close');
          } else if (bet.status === "Cancelled") {
            this.showToast('Bet was cancelled: ' + bet.teamName, 'Close');
          } else {
            this.showToast('Bet status: ' + bet.status, 'Close');
          }
        } else {
          this.showToast('No bet found in the response', 'Close');
        }
    
        this.isBetProcessing = false;
        this.loadUserBets();
      },
      error: (error: any) => {
        if (error.name === 'TimeoutError') {
          console.error('Error placing bet: Request timed out', error);
          this.showToast('Error placing bet: Request timed out', 'Close');
        } else {
          console.error('Error placing bet', error);
          this.showToast('Error placing bet: ' + error.message, 'Close');
        }
        this.isBetProcessing = false;
      }
    });
  }
  getTruncatedTeamName(fullName: string, maxLength: number = 15): string {
    if (fullName.length > maxLength) {
      return fullName.slice(0, maxLength) + '...'; // Truncate and append '...'
    }
    return fullName; // No truncation needed
  }
  placeTestBet(match) {
    
    const betDetails = {
      betType: this.betType,
      teamName: match.teamName,
      odd: Number(this.selectedOdds),
      amount: Number(this.betAmount),
      matchUrl: this.matchUrl // Adding the match url to betDetails
    };
    // Example logic for placing a bet
    console.log(`Placing a ${this.betType} bet on team ${match.teamName} with odds ${this.selectedOdds} and amount ${this.betAmount}`);
    this.showBetting = false;
    this.isBetProcessing = true;
    // Send this data to your backend or process it as needed

    this.cricketService.placeBet(betDetails).subscribe({
      next: (response) => {
        this.showToast('Bet placed waiting for confirmation!', 'Close');
        console.log('Bet placed successfully', response);
        this.showBetting = false; // Hide betting options
        // Additional success handling
        this.checkBetConfirmation(response.betId);
      },
      error: (error) => {
        console.error('Error placing bet', error);
        this.showToast('Error placing bet: ' + error.message, 'Close');
        this.isBetProcessing = false;
        // Error handling
      }
    });
  }

  checkBetConfirmation(betId: number) {
    // Implement WebSocket subscription or polling to check bet status
    // Once confirmed:
    this.betStatusSubscription = this.eventListService.subscribeToBetStatusTopic().subscribe(bet => {
      console.log("Bet status received here after confirmation  ", bet);
      // parse bet json
      const parsedBet = JSON.parse(bet.body);
      if(parsedBet.status === 'Confirmed' && parsedBet.betId === betId) {
        console.log("setting is bet processing to false after confirmation");
        this.showToast('Bet placed Confirmed!', 'Close');
        this.isBetProcessing = false;
        this.loadUserBets();
        this.authService.updateUserDetails(parsedBet.user);
      }
      if(parsedBet.status === 'Cancelled' && parsedBet.betId === betId) {
        console.log("setting is bet processing to false after cancellation");
        this.showToast('Error placing bet', 'Close');
        this.isBetProcessing = false;
        this.loadUserBets();
      }
    });
    // Update UI based on bet confirmation
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
    if (this.selectedOdds != null && !isNaN(Number(this.selectedOdds))) {
      this.selectedOdds = parseFloat(Number(this.selectedOdds).toFixed(1));
    } else {
      this.selectedOdds = 0; // or some default value
    }
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
    
  showBettingOptionsForTestMatch(section:string,  index: number , betType:string) {
    this.showBetting = true;
    // If it's a test match, set the selected odds and amount based on the match parameter
    this.currentMatchIndex = index; // Set the current match index
    this.betType = betType;
    
    const match = this.testMatchOdds[index]; // Access the match using the index
    this.betAmount = 0; // Clear the stakes when clicking on odds again


    if (betType === 'back') {
      this.selectedOdds = match.odds.backOdds;
    } else if (betType === 'lay') {
      this.selectedOdds = match.odds.layOdds;
    }
    this.showBettingFor = section;
    // Additional logic to handle the lay button state...
    if (this.showBettingFor == 'testMatchOdds' && betType === 'lay') {
      this.layButtonActive = true;
    }
    if (this.showBettingFor == 'testMatchOdds' && betType === 'back') {
      this.layButtonActive = false;
    }

  }

  loadUserBets(): void {
    this.cricketService.getUserBetsForMatch(this.matchUrl).subscribe(
      (response) => {
        console.log(response);
        if(response.bets.length > 0){
          this.userBets= response.bets;
          this.updatedUserData = this.userBets[0].user;
          this.authService.updateUserDetails(this.updatedUserData);
        }

        if (response && response.adjustedExposures) {
          this.formattedExposures = this.formatAndGroupExposures(response.adjustedExposures);
          // Select the first team to display
          const teamNames = Object.keys(this.formattedExposures);
          if (teamNames.length > 0) {

            let teamName = teamNames[0];
            this.totalPotentialWin = this.formattedExposures[teamName].win;
            this.totalPotentialLoss = this.formattedExposures[teamName].lose;
            this.winFormattedKey = `${teamName} Win`;
            this.loseFormattedKey = `${teamName} Lose`;
          }

          
  
          if (response.sessionExposures) {
            this.sessionExposures = this.formatSessionExposures(response.sessionExposures);
          }
          
          console.log('Total Potential Win:', this.totalPotentialWin);
          console.log('Total Potential Loss:', this.totalPotentialLoss);
          console.log('Win Formatted Key:', this.winFormattedKey);
          console.log('Lose Formatted Key:', this.loseFormattedKey);
        }


      }, 
      (error) => {
        console.error('Error fetching bets:', error);
      }
    );
  }

  // Set the stake amount based on the quick stake button clicked
  setStake(amount: number) {
    this.betAmount += amount;
  }

  formatSessionExposures(sessionExposures: any): any[] {
    const formattedSessionExposures: any[] = [];
    Object.keys(sessionExposures).forEach(key => {
      formattedSessionExposures.push({
        name: key,
        amount: sessionExposures[key]
      });
    });
    return formattedSessionExposures;
  }

  formatAdjustedExposures(exposures: any): any {
    const formattedExposures = {};

    Object.keys(exposures).forEach(key => {
        const parts = key.split(' ');
        const teamName = parts[0];
        const outcome = parts[parts.length - 1].toLowerCase();
        const formattedKey = `${teamName} ${outcome}`;
        formattedExposures[formattedKey] = exposures[key];

        if (outcome === 'win') {
            this.totalPotentialWin = exposures[key];
            this.winFormattedKey = formattedKey;
            
        } else if (outcome === 'lose') {
            this.totalPotentialLoss = exposures[key];
            this.loseFormattedKey = formattedKey;
        }
    });

    return formattedExposures;
}

onTabChange(event: MatTabChangeEvent) {
  if (event.index === 1) { // Match Info tab is selected
    this.activatedRoute.params.subscribe(params => {
      const match = params['path']; // Use 'path' instead of 'match'
      this.matchUrl = match;

      this.fetchMatchInfo(this.matchUrl);
    });
  } else if (event.index === 2) { // Scorecard tab is selected
    //this.fetchScorecardInfo(this.matchUrl);

    this.activatedRoute.params.subscribe(params => {
      const match = params['path']; // Use 'path' instead of 'match'
      this.matchUrl = match;

      this.fetchScorecardInfo(this.matchUrl);
    });
  }
}

fetchScorecardInfo(matchUrl:string){

  this.cricketService.getScorecardInfo(matchUrl).subscribe(
    data => {
      this.scorecardData = data;
      console.log('Match Scorecard:', this.scorecardData);
    },
    error => {
      console.error('Error fetching match scorecard:', error);
    }
  );
}

fetchMatchInfo(matchUrl:string) {
  if (this.matchInfo) {
    // Data already fetched, no need to fetch again
    return;
  }

  this.cricketService.getMatchInfo(matchUrl).subscribe(
    data => {
      this.matchInfo = data;
      console.log('Match Info:', this.matchInfo);

      // Extract keys
      this.teamComparisonKeys = Object.keys(this.matchInfo.team_comparison || {});
      if (this.teamComparisonKeys.length) {
        this.teamComparisonSubKeys = Object.keys(this.matchInfo.team_comparison[this.teamComparisonKeys[0]]);
      }
      this.venueStatsKeys = Object.keys(this.matchInfo.venue_stats || {});
      this.playingXIKeys = Object.keys(this.matchInfo.playing_xi || {});
      this.teamFormKeys = Object.keys(this.matchInfo.team_form || {});

      this.setVenuePercentages();
    },
    error => {
      console.error('Error fetching match info:', error);
    }
  );
}
  setVenuePercentages() {
    // Ensure that win_bat_first exists and is a string
    const batFirstStr: string = this.matchInfo.venue_stats.win_bat_first || '0%';
    this.winBatFirstPercentage = this.parsePercentage(batFirstStr);
    this.winBowlFirstPercentage = 100 - this.winBatFirstPercentage;

    // Optional: Validate percentages
    if (this.winBatFirstPercentage < 0 || this.winBatFirstPercentage > 100) {
      console.warn('win_bat_first percentage out of bounds:', this.winBatFirstPercentage);
      this.winBatFirstPercentage = Math.max(0, Math.min(this.winBatFirstPercentage, 100));
      this.winBowlFirstPercentage = 100 - this.winBatFirstPercentage;
    }
  }

  parsePercentage(value: string): number {
    // Remove '%' and convert to number
    const num = parseFloat(value.replace('%', ''));
    return isNaN(num) ? 0 : num;
  }

getPlayerIcon(role: string): string {
  if (role.toLowerCase().includes('batter')) {
    return 'sports_cricket';
  } else if (role.toLowerCase().includes('bowler')) {
    return 'emoji_events';
  } else if (role.toLowerCase().includes('all rounder')) {
    return 'autorenew';
  } else if (role.toLowerCase().includes('wk')) {
    return 'sports';
  } else {
    return 'person';
  }
}

calculateBowlFirstPercentage(): void {
  this.bowlFirstPercentage = 100 - this.matchInfo.venue_stats.win_bat_first;
}

getTeamLogo(team: string): string {
  // Return the path to the team's logo
  return `assets/team-logos/${team.toLowerCase()}.png`;
}

getResultClass(result: string): string {
  switch (result) {
    case 'W':
      return 'win';
    case 'L':
      return 'loss';
    case 'D':
      return 'draw';
    default:
      return '';
  }
}

formatAndGroupExposures(exposures: any): Record<string, FormattedExposure> {
  const formattedExposures: Record<string, FormattedExposure> = {};

  Object.keys(exposures).forEach(key => {
    const parts = key.replace('Adjusted', '').trim().split(' ');
    const teamName = parts.slice(0, -1).join(' '); 
    const outcome = parts[parts.length - 1].toLowerCase(); 

    if (!formattedExposures[teamName]) {
      formattedExposures[teamName] = { win: 0, lose: 0 };
    }

    if (outcome === 'win') {
      formattedExposures[teamName].win = exposures[key];
    } else if (outcome === 'lose') {
      formattedExposures[teamName].lose = exposures[key];
    }
  });

  return formattedExposures;
}

// Function to clear the stake
clearStake() {
  this.betAmount = 0;
}

placeSessionBet() {
  if (this.betAmount <= 0) {
    // Handle invalid bet
    return;
  }

  let bet: Bet = {
    teamName: this.battingTeam,
    betType: this.selectedBetType,
    amount: Number(this.betAmount),
    odd: Number(this.selectedOdds),
    isSessionBet: true, // Explicitly set as boolean true
    sessionName: this.session,
    matchUrl: this.matchUrl
  };

  this.isBetProcessing = true;

  this.cricketService.placeBet(bet).pipe(timeout(10000)).subscribe({
    next: (response: any) => {
      console.log('Bet response received for match bet', response);
      
      // Assuming response.bet contains the bet object
      if (response.bet) {
        const bet = response.bet;
  
        if (bet.status === "Confirmed") {
          this.showToast('Bet placed and confirmed!', 'Close');
        } else if (bet.status === "Cancelled") {
          this.showToast('Bet was cancelled: ' + bet.teamName, 'Close');
        } else {
          this.showToast('Bet status: ' + bet.status, 'Close');
        }
      } else {
        this.showToast('No bet found in the response', 'Close');
      }
  
      this.isBetProcessing = false;
      this.loadUserBets();
    },
    error: (error: any) => {
      if (error.name === 'TimeoutError') {
        console.error('Error placing bet: Request timed out', error);
        this.showToast('Error placing bet: Request timed out', 'Close');
      } else {
        console.error('Error placing bet', error);
        this.showToast('Error placing bet: ' + error.message, 'Close');
      }
      this.isBetProcessing = false;
    }
  });
}

}
