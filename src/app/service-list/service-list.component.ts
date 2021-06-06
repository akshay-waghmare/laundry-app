import { Component, OnInit } from '@angular/core';
import { FootballService} from './football.service';
import * as _  from 'underscore'
import { group } from '@angular/animations';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  constructor(private footballService : FootballService) { }

  ngOnInit() {

    // this.footballService.getUpcomingFootballEvents().subscribe((data) => {
    //   console.log(data);     
    //    let result = _.toArray(data);
    //   let  groupedByLeages =  _.groupBy(result,(obj) => { return obj.country_leagues});

    //   console.log(groupedByLeages);
      

    // });

    this.footballService.getInplayFootballEvents().subscribe((data) => {
      console.log(data);
      let result = _.toArray(data);
      console.log(result);
      let  groupedByLeages =  _.groupBy(result,(obj) => { return obj.country_leagues});

      console.log(groupedByLeages);
    });
  }

}



// 1st create a service to call my api and try to get data : done
// 2nd call the service from this ts file  : done 

//TODO ::


//got all the data required now change the data in a way you want so that it can be manipulated
  //try to first show all data according to start time 
  //try to segregate/Group data according to league



//also time is in the unix timestamp format so change it to readable format 
// also ngx-moment is the library i found for it so jus play around with it
// display it in ui in html in tabular for now .