import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of, interval, timer } from 'rxjs';
import { BetMarketService } from './bet-market.service';

@Component({
  selector: 'app-bet-market',
  templateUrl: './bet-market.component.html',
  styleUrls: ['./bet-market.component.css']
})
export class BetMarketComponent implements OnInit {
    result: Observable<any>;
    market: any;
    selections: any[];
    displayedColumns: string[] = ['name', 'lastPriceTraded'];
  marketId: any;
  subscription: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private betMarketService: BetMarketService
    ) { }

  ngOnInit() {
    this.result = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.betMarketService.getBetMarketByMarketId(params.get('id'))
      )
    );

    this.result.subscribe(data => {
      this.market = data.market;
      this.marketId = this.market.id;
      this.selections = data.selections;
      console.log(this.market);
      console.log(this.selections);
    });

    this.subscription = timer(0, 1000).pipe(
      switchMap(() => this.betMarketService.getBetMarketByMarketId(this.marketId))
    ).subscribe(data => {
      this.market = data.market;
      this.marketId = this.market.id;
      this.selections = data.selections;
      console.log('inside');
      console.log(this.market);
      console.log(this.selections);

  });

  }

}
