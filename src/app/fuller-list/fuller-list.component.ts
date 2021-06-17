import { Component, OnInit } from '@angular/core';
import { FullerServiceService } from './fuller-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fuller-list',
  templateUrl: './fuller-list.component.html',
  styleUrls: ['./fuller-list.component.css']
})
export class FullerListComponent implements OnInit {
  marketListInplay: any[];
  marketListNInplay: any[];
  marketsAboutToStart: any[];
  displayedColumns: string[] = ['startTime', 'eventName', 'marketName', 'actions'];
  constructor(
    private fullerService: FullerServiceService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {

    
  //   this.fullerService.getMarketListByEvent(7, true ).subscribe(data => {
  //     this.marketListInplay = data;
  //     // console.log(this.marketListInplay);
  //     // this.marketListLatest = data.result;
  //     // this.marketListInplay = data.result.filter(x => new Date(x.startTime) >= new Date());
  //     // console.log(this.marketListLatest);
  // });
  this.fullerService.getMarketListByEvent(7, false ).subscribe(data => {
    // console.log(this.marketListNInplay);
    this.marketListNInplay = data;
    this.marketsAboutToStart = data.result.filter(x => new Date(x.startTime) >= new Date());
      console.log(this.marketsAboutToStart);
});

  }

  showMarket(element: any){
    console.log(element.id);
    this.router.navigate(['../bet-market/', element.id] , { relativeTo: this.route });
  }

}
