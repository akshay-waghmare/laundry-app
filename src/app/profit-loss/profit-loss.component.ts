/* import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CricketService } from '../cricket-odds/cricket-odds.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.css']
})
export class ProfitLossComponent implements OnInit, OnDestroy, AfterViewInit {
  profitLoss = new MatTableDataSource<any>([]); // Data source for profit and loss
  profitLossColumns: string[] = ['profitLoss', 'finalBalance', 'remark', 'transactionDate', 'transactionType']; // Columns for profit and loss
  private subscriptions: Subscription = new Subscription();
  startDate: string;
  endDate: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cricketService: CricketService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog // Inject MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProfitLoss();

    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      '(max-width: 480px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.profitLossColumns = ['profitLoss', 'finalBalance', 'remark', 'transactionDate', 'transactionType'];
      } else {
        this.profitLossColumns = ['profitLoss', 'finalBalance', 'remark', 'transactionDate', 'transactionType'];
      }
    });
  }

  ngAfterViewInit(): void {
    this.profitLoss.paginator = this.paginator;
  }

  loadProfitLoss(): void {


    const subscription = this.cricketService.getProfitLoss(new Date(this.startDate), new Date(this.endDate)).subscribe(
        (response: any) => {
        console.log("logging profit loss response : ", response);
        const profitLossArray = Object.values(response);
        // Sorting the profitLossArray by transactionDate in ascending order
        profitLossArray.sort((a: any, b: any) => {
          const dateA = new Date(a.transactionDate);
          const dateB = new Date(b.transactionDate);

          // Sort ascending: earlier dates first
          return dateA.getTime() - dateB.getTime();
        });

        this.profitLoss.data = profitLossArray;
      },
      (error) => {
        console.error('Error fetching profit and loss:', error);
      }
    );
    this.subscriptions.add(subscription);
  }

  openTransactionDetail(transaction: any): void {
    this.dialog.open(TransactionDetailComponent, {
      data: transaction,
      width: '600px'
    });

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
 */

import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { CricketService } from '../cricket-odds/cricket-odds.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component'; // Import TransactionDetailComponent

@Component({
  selector: 'app-profit-loss',
  templateUrl: './profit-loss.component.html',
  styleUrls: ['./profit-loss.component.css']
})
export class ProfitLossComponent implements OnInit, OnDestroy, AfterViewInit {
  profitLoss = new MatTableDataSource<any>([]); // Data source for profit and loss
  profitLossColumns: string[] = ['profitLoss', 'finalBalance', 'remark', 'transactionDate', 'transactionType']; // Columns for profit and loss
  private subscriptions: Subscription = new Subscription();
  startDate: string;
  endDate: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private cricketService: CricketService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog // Inject MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProfitLoss();

    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      '(max-width: 480px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.profitLossColumns = ['profitLoss', 'finalBalance', 'remark', 'transactionDate', 'transactionType'];
      } else {
        this.profitLossColumns = ['profitLoss', 'finalBalance', 'remark', 'transactionDate', 'transactionType'];
      }
    });
  }

  ngAfterViewInit(): void {
    this.profitLoss.paginator = this.paginator;
  }

  loadProfitLoss(): void {
    const subscription = this.cricketService.getProfitLoss(new Date(this.startDate), new Date(this.endDate)).subscribe(
      (response: any) => {
        console.log("logging profit loss response : ", response);
        const profitLossArray = Object.values(response);
        // Sorting the profitLossArray by transactionDate in ascending order
        profitLossArray.sort((a: any, b: any) => {
          const dateA = new Date(a.transactionDate);
          const dateB = new Date(b.transactionDate);

          // Sort ascending: earlier dates first
          return dateA.getTime() - dateB.getTime();
        });

        this.profitLoss.data = profitLossArray;
      },
      (error) => {
        console.error('Error fetching profit and loss:', error);
      }
    );
    this.subscriptions.add(subscription);
  }

  openTransactionDetail(rowData: any): void {
    this.dialog.open(TransactionDetailComponent, {
      width: '600px',
      data: rowData // Pass the clicked row data to the dialog
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
