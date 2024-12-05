import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})

export class MatchInfoComponent  {

  
  teamForm = {
    teamName: 'Glamorgan',
    matches: [
      { result: 'L' },
      { result: 'W' },
      { result: 'W' },
      { result: 'L' },
      { result: 'W' }
    ]
  };

  matchDetails = {
    date: 'Sep 23, 2024, 3:30:00 PM',
    venue: 'Trent Bridge, Nottingham',
    tournament: {
      name: 'England One Day Cup 2024',
      image: 'https://cricketvectors.akamaized.net/Series/1J3.png?impolicy=default_web'
    }
  };

}
