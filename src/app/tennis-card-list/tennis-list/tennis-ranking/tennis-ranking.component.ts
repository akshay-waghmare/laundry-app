import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as _ from 'underscore';
import { TennisaRankingService } from './tennisa-ranking.service';

@Component({
  selector: 'app-tennis-ranking',
  templateUrl: './tennis-ranking.component.html',
  styleUrls: ['./tennis-ranking.component.css']
})
export class TennisRankingComponent implements OnInit {

  groupedByLeagesInplay :  any;
  groupedByLeaguesUpcoming: any;
  selectedTab : FormControl ;

 result: any;
  result1: any;

 constructor(private tennisaService : TennisaRankingService,
  ) {
    this.selectedTab = new FormControl(0); 
   }


  ngOnInit() {

    console.log("tennis list");
    this.tennisaService.getTennisAtpRankingEvents().subscribe((data) => {
   
       
     this.result= data.rankings;
    console.log(this.result);
    });

    this.tennisaService.getTennisWtaRankingEvents().subscribe((data) => {
   
       
      this.result1= data.rankings;
     console.log(this.result);
     });
   
  }
  isDataEmpty(){
    console.log("printing isempty " , _.isEmpty(this.result));
    return _.isEmpty(this.result);
  }

}
