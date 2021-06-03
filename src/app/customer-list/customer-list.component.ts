import { Component, OnInit } from '@angular/core';
import { StompService , RxStompService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  private topicSubscription: Subscription;

  
  tickerMap = {
   get(ticker): any {
     return this[ticker];
   },
   set(tickerObject) {
     this[tickerObject.ticker] = tickerObject.price;
   }
 };

  constructor(private rxStompService: RxStompService) { }

  ngOnInit() {

    this.topicSubscription = this.rxStompService.watch('/topic/price.stock.*').subscribe((data) => {
      console.log('subscribed to data..', data.body);
      this.tickerMap.set(JSON.parse(data.body));
    });
  }

  ngOnDestroy(){
    this.topicSubscription.unsubscribe();
  }

}
