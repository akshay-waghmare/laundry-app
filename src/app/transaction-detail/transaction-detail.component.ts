import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CricketService } from '../cricket-odds/cricket-odds.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent {
  transaction: any;
  private subscriptions: Subscription = new Subscription();
  bets: any[] = [];
  filteredBets: any[] = [];
  displayedColumns: string[] = ['amount', 'betType', 'matchUrl', 'odd', 'placedAt', 'potentialWin', 'status', 'teamName', 'userId', 'isSessionBet', 'sessionName'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cricketService: CricketService
  ) {
    this.transaction = data;
    this.transaction.matchUrl = this.generateUrlFromRemark(this.transaction.remark);
  
    // Load the user's bet history and then filter the bets based on the match URL
    this.loadUserBetHistory();
  }
  
  generateUrlFromRemark(remark: string): string {
    // Remove the prefix before the first slash and trim the remaining string
    const cleanedRemark = remark.substring(remark.indexOf('/') + 1).trim();
    
    // Replace spaces with hyphens and convert to lowercase
    return cleanedRemark.replace(/\s+/g, '-').toLowerCase();
  }
  
  // Method to load user bet history
  loadUserBetHistory(): void {
    const subscription = this.cricketService.getUserBetHistory().subscribe(
      (response: any) => {
        console.log("Logging bet history response:", response);
        this.bets = response.bets;
  
        // Filter bets based on matchUrl in the transaction
        this.filterBetsByMatchUrl();
      },
      (error) => {
        console.error('Error fetching bet history:', error);
      }
    );
    this.subscriptions.add(subscription);
  }

  // Method to filter bets based on the matchUrl in the transaction
  filterBetsByMatchUrl(): void {
    if (this.bets && this.transaction.matchUrl) {
      this.filteredBets = this.bets.filter(bet => bet.matchUrl === this.transaction.matchUrl);
      console.log("Filtered Bets:", this.filteredBets);
    }
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
