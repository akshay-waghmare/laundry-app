import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Bet } from './bet';

@Component({
  selector: 'app-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.css']
})
export class BetHistoryComponent {
  // create cricket array
  sportsOptions: string[] = ['Cricket', 'Football', 'Tennis'];
  bets = new MatTableDataSource<Bet>([]); // Replace 'Bet' with your data model
  displayedColumns: string[] = ['sportName', 'eventName', 'marketName','selection','type','odds','stake','placedTime','matchedTime']; // Add more column names here

  constructor() {
    // Example of creating a new Bet instance
    
      }

  bet = new Bet({
    betId: 1,
    userId: 101,
    matchId: 1001,
    betType: 'Back',
    amount: 50.00,
    odds: 1.5,
    potentialWin: 75.00,
    status: 'Pending',
    placedAt: new Date()
  });
  
  
 

  getHistory() {
    // Implement your logic to fetch bet history
  }
}
