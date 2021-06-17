import { Component, Input, OnInit } from '@angular/core';
import { FootballService} from './football.service';
import * as _  from 'underscore'
import { group } from '@angular/animations';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  providers: [FootballService],
})
export class ServiceListComponent implements OnInit {

    groupedByLeagesInplay :  any;
    groupedByLeaguesUpcoming: any;
    selectedTab : FormControl ;
  
   result: any;
   displayedColumns: string[] = ['home', 'away', 'odds'];
   inplayTopicSubscription:Subscription;

  constructor(private footballService : FootballService,
              ) {
                this.selectedTab = new FormControl(0);
               }

  ngOnInit() {

    this.footballService.getUpcomingFootballEvents().subscribe((data) => {
      console.log(data);     
       let result = _.toArray(data);
      this.groupedByLeaguesUpcoming =  _.groupBy(result,(obj) => { return obj.country_leagues});

      console.log("upcoming : " + this.groupedByLeaguesUpcoming);
      

    });


    this.footballService.getInplayFootballEvents().subscribe((data) => {
      this.result = _.toArray(data);
      this.groupedByLeagesInplay =  _.groupBy(this.result,(obj) => { return obj.country_leagues});
    });

    this.inplayTopicSubscription = this.footballService.getInplayFootballEventsSocket().subscribe((data) => {
      console.log('subscribed to data..', data.body);
      data = JSON.parse(data.body);
      this.result=_.toArray(data);
        this.groupedByLeagesInplay =  _.groupBy(this.result,(obj) => { return obj.country_leagues});
      console.log("printing in websocket call " + this.result);
      console.log(this.groupedByLeagesInplay);
    });
  }

  

  

}



// 1st create a service to call my api and try to get data : done
// 2nd call the service from this ts file  : done 

//TODO ::

//beautification : see how the old theme goes .

// make a rest call in backend service to fetch once 
//call and load data here 

//make a similar functionality for all data today
// improve the left panel menu