import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as _  from 'underscore'


@Component({
  selector: 'football-card-list',
  templateUrl: './football-card-list.component.html',
  styleUrls: ['./football-card-list.component.css']
})
export class FootballCardListComponent implements OnInit {

  @Input()
  footballData : any;

  @Input()
  selectedTabIndex : Number;

  ifBlink:Boolean;
   
  constructor() { }

  ngOnInit() {
    console.log("inside football-card-list component");
    console.log("printing footballData : " , this.footballData);
  }

  isDataEmpty(){
    console.log("printing isempty " , _.isEmpty(this.footballData));
    return _.isEmpty(this.footballData);
  }

  getCalculatedElapsedTime(strtTime,periodTime):any {
    let secondhalf:Boolean = false;

    
    let startingTime = new Date(strtTime*1000); // conversion from timestamp
    let startingHalfTime = new Date(periodTime*1000);
    
    let currentTime = new Date();
    let diff  = (currentTime.getTime() - startingTime.getTime() ) / 1000;
    let elapsedTime = Math.floor(diff/60);

    if(this.selectedTabIndex==1){
      return startingTime.toLocaleDateString() + "\n" + startingTime.toLocaleTimeString();
    }

    let timeBetweenStartingOfHalves =  ( startingHalfTime.getTime() - startingTime.getTime() ) / 1000;
    let breakMinutes = Math.floor(timeBetweenStartingOfHalves / 60) - 45;

    if(Math.floor(timeBetweenStartingOfHalves / 60) >= 60){
      console.log('in second half');
      secondhalf = true;
    }

    if(elapsedTime > 45 && secondhalf==false){
      return 'HT'
    }
    else if(secondhalf==true){
      return elapsedTime-breakMinutes;
    }
    else{
      return elapsedTime;
    }
  }
  
  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['footballData']) {
      this.ifBlink=true;
      console.log("data changed here man !!");
    }
}

}
