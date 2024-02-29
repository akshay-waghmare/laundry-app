import { Component, Input, OnInit } from '@angular/core';
import { TennisService } from './tennis.service';
import * as _ from 'underscore'
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
  providers: [TennisService],
})
export class TennisListComponent implements OnInit {

  groupedByLeagesInplay: any;
  groupedByLeaguesUpcoming: any;
  selectedTab: FormControl;

  result: any;
  displayedColumns: string[] = ['home', 'away', 'odds'];
  inplayTopicSubscription: Subscription;
  result1: any;
  d: Date;

  constructor(private tennisService: TennisService,
  ) {
    this.selectedTab = new FormControl(0);
  }


  ngOnInit() {
    this.tennisService.getUpcomingTennisEvents().subscribe((data) => {

      let result = data.events;
      this.groupedByLeaguesUpcoming = _.groupBy(result, (obj) => { return obj.tournament.name });

      console.log("upcoming : " + this.groupedByLeaguesUpcoming);

    });
    this.tennisService.getAllTennisEvents().subscribe((data) => {

      let result = data.events;
      this.groupedByLeagesInplay = _.groupBy(result, (obj) => { return obj.tournament.name });

    });

    this.inplayTopicSubscription = this.tennisService.getInplayTennisEventsSocket().subscribe((data) => {
      data = JSON.parse(data.body);
      this.result = _.toArray(data.events);
      this.groupedByLeagesInplay = _.groupBy(this.result, (obj) => { return obj.tournament.name });


    });
  }
}