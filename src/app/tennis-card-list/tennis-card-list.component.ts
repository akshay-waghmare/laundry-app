import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as _  from 'underscore' 

@Component({
  selector: 'tennis-card-list',
  templateUrl: './tennis-card-list.component.html',
  styleUrls: ['./tennis-card-list.component.css']
})
export class TennisCardListComponent implements OnInit {


  @Input()
  tennisData : any;

 
  @Input()
  selectedTabIndex : Number;

  ifBlink:Boolean;
   
  constructor() { }

  ngOnInit() {
    console.log("inside tennis-card-list component");
  //  console.log("printing tennisData : " , this.tennisData);
  }

  isDataEmpty(){
  //  console.log("printing isempty " , _.isEmpty(this.tennisData));
    
    return _.isEmpty(this.tennisData);
  }

  /* isDataHas(leagueMatches:any){
    //  console.log("pppp",_.has(t,"firstToServe"));
      return _.has(leagueMatches,"firstToServe");
    }
  isPeriod1Has(leagueMatches:any){
      return _.has(leagueMatches,"period1TieBreak")
    }
  isPeriod2Has(leagueMatches:any){
      return _.has(leagueMatches,"period2TieBreak")
    }

  isPeriod3Has(leagueMatches:any){
      return _.has(leagueMatches,"period2TieBreak")
    }
  isAwayScore(leagueMatches:any){
    return _.has(leagueMatches,"point")
  }
  isHomeScore(leagueMatches:any){
    return _.has(leagueMatches,"point")
  } */

}
