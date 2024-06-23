import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CricketService } from '../cricket-odds/cricket-odds.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.css']
})
export class BetHistoryComponent implements OnInit, OnDestroy, AfterViewInit {
  sportsOptions: string[] = ['Cricket', 'Football', 'Tennis'];
  bets = new MatTableDataSource<any>([]); // Replace 'any' with your data model if defined
  displayedColumns: string[] = ['teamName', 'type', 'amount', 'odds', 'status']; // Default columns for all screens
  private subscriptions: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cricketService: CricketService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.loadUserBetHistory();

    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      '(max-width: 480px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.displayedColumns = ['teamName', 'type', 'amount', 'odds', 'status'];
      } else {
        this.displayedColumns = ['teamName', 'type', 'amount', 'odds', 'status'];
      }
    });
  }

  ngAfterViewInit(): void {
    this.bets.paginator = this.paginator;
  }

  loadUserBetHistory(): void {
    const subscription = this.cricketService.getUserBetHistory().subscribe(
      (response: any) => {
        console.log("logging bet history response : " , response);
        this.bets.data = response.bets;
      },
      (error) => {
        console.error('Error fetching bet history:', error);
      }
    );
    this.subscriptions.add(subscription);
  }

  getHistory(): void {
    this.loadUserBetHistory();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
