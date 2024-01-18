import { Component, Input, OnInit } from '@angular/core';
import { TennisService} from './tennis.service';
import * as _  from 'underscore'
import { group } from '@angular/animations';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { object } from 'underscore';
import { Data } from '@angular/router';

@Component({
  selector: 'app-tennis-list',
  templateUrl: './tennis-list.component.html',
  styleUrls: ['./tennis-list.component.css'],
  providers:[TennisService],
})
export class TennisListComponent implements OnInit {

  groupedByLeagesInplay :  any;
    groupedByLeaguesUpcoming: any;
    selectedTab : FormControl ;
  
   result: any;
   displayedColumns: string[] = ['home', 'away', 'odds'];
   inplayTopicSubscription: Subscription;
  result1: any;
  d: Date;

  constructor(private tennisService : TennisService,
              ) {
                this.selectedTab = new FormControl(0); 
               }


               ngOnInit() {
                
                console.log("tennis list");
                this.tennisService.getUpcomingTennisEvents().subscribe((data) => {
               // console.log(data,"Tennis data");     
                   
                 this.result=data.events;
                console.log(this.result);
            //  this.groupedByLeaguesUpcoming = _.groupBy(this.result,(obj) => { return obj.tournament.name });

        //console.log("upcoming : " + this.groupedByLeaguesUpcoming);
            
                });

                this.tennisService.getAllTennisEvents().subscribe((data) => {
                   console.log(data,"Tennis data");     
                      
                   this.d=new Date;
                    this.result1=_.filter(data.events,this.d);

                   console.log(this.result1);
                
                });
                
                this.inplayTopicSubscription = this.tennisService.getInplayTennisEventsSocket().subscribe((data) => {
                  console.log('subscribed to data..', data.body);
                 data = JSON.parse(data.body);
                  this.result=_.toArray(data.events);
                    
                  console.log("printing in websocket call " + this.result);
                  //console.log(this.groupedByLeagesInplay);
                });
   }
}