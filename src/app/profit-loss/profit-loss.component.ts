import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CricketService } from '../cricket-odds/cricket-odds.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.css']
})
export class ProfitLossComponent implements OnInit, OnDestroy, AfterViewInit {
  profitLoss = new MatTableDataSource<any>([]); // Data source for profit and loss
  profitLossColumns: string[] = ['matchName', 'profitOrLoss']; // Columns for profit and loss
  private subscriptions: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cricketService: CricketService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.loadProfitLoss();

    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      '(max-width: 480px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.profitLossColumns = ['matchName', 'profitOrLoss'];
      } else {
        this.profitLossColumns = ['matchName', 'profitOrLoss'];
      }
    });
  }

  ngAfterViewInit(): void {
    this.profitLoss.paginator = this.paginator;
  }

  loadProfitLoss(): void {
    const subscription = this.cricketService.getProfitLoss().subscribe(
      (response: any) => {
        console.log("logging profit loss response : ", response);
        this.profitLoss.data = response;
      },
      (error) => {
        console.error('Error fetching profit and loss:', error);
      }
    );
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
