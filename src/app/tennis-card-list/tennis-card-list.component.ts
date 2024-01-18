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

  isDataHas(t:any){
    //  console.log("pppp",_.has(t,"firstToServe"));
      return _.has(t,"firstToServe");
    }
  isPeriod1Has(t:any){
      return _.has(t,"period1TieBreak")
    }
  isPeriod2Has(t:any){
      return _.has(t,"period2TieBreak")
    }

  isPeriod3Has(t:any){
      return _.has(t,"period2TieBreak")
    }
  isAwayScore(t:any){
    return _.has(t,"point")
  }
  isHomeScore(t:any){
    return _.has(t,"point")
  }

  }

