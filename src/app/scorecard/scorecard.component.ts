import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.css']
})
export class ScorecardComponent implements OnInit {
  match_info: any;
  batting: any;
  bowling: any;
  fall_of_wickets: any;
  partnerships: any;

  ngOnInit() {
    const scorecardData = {
      match_info: {
        team: "SLW",
        score: "43-3",
        overs: "10.0"
      },
      batting: {
        team: "SLW",
        batters: [
          {
            "name": "Vishmi Gunaratne",
            "runs": 0,
            "balls": 10,
            "fours": 0,
            "sixes": 0,
            "strike_rate": 0.00,
            "dismissal": "lbw b Schutt"
          },
          {
            "name": "Chamari Athapaththu (C)",
            "runs": 3,
            "balls": 12,
            "fours": 0,
            "sixes": 0,
            "strike_rate": 25.00,
            "dismissal": "lbw b Gardner"
          },
          {
            "name": "Harshitha Madavi Samarawickrama",
            "runs": 20,
            "balls": 28,
            "fours": 2,
            "sixes": 0,
            "strike_rate": 71.43,
            "dismissal": "Batting"
          },
          {
            "name": "Kavisha Dilhari",
            "runs": 5,
            "balls": 6,
            "fours": 0,
            "sixes": 0,
            "strike_rate": 83.33,
            "dismissal": "lbw b Molineux"
          },
          {
            "name": "Nilakshi de Silva",
            "runs": 7,
            "balls": 9,
            "fours": 0,
            "sixes": 0,
            "strike_rate": 77.78,
            "dismissal": "Batting"
          }
        ],
        extras: {
          byes: 0,
          leg_byes: 1,
          wides: 2,
          no_balls: 5,
          penalty: 0,
          total: 8
        }
      },
      bowling: {
        team: "Australia",
        bowlers: [
          {
            "name": "Megan Schutt",
            "overs": 3.0,
            "maidens": 1,
            "runs_conceded": 8,
            "wickets": 1,
            "economy_rate": 2.67
          },
          {
            "name": "Ashleigh Gardner",
            "overs": 3.0,
            "maidens": 1,
            "runs_conceded": 10,
            "wickets": 1,
            "economy_rate": 3.33
          },
          {
            "name": "Darcie Brown",
            "overs": 1.0,
            "maidens": 0,
            "runs_conceded": 12,
            "wickets": 0,
            "economy_rate": 12.00
          },
          {
            "name": "Sophie Molineux",
            "overs": 1.0,
            "maidens": 0,
            "runs_conceded": 4,
            "wickets": 1,
            "economy_rate": 4.00
          },
          {
            "name": "Georgia Wareham",
            "overs": 1.0,
            "maidens": 0,
            "runs_conceded": 5,
            "wickets": 0,
            "economy_rate": 5.00
          },
          {
            "name": "Annabel Sutherland",
            "overs": 1.0,
            "maidens": 0,
            "runs_conceded": 3,
            "wickets": 0,
            "economy_rate": 3.00
          }
        ]
      },
      fall_of_wickets: [
        {
          "batsman": "Vishmi Gunaratne",
          "score": "6-1",
          "overs": "3.0"
        },
        {
          "batsman": "Chamari Athapaththu (C)",
          "score": "6-2",
          "overs": "3.2"
        },
        {
          "batsman": "Kavisha Dilhari",
          "score": "25-3",
          "overs": "6.4"
        }
      ],
      partnerships: [
        {
          "partnership": "1ST WICKET",
          "batter1": "Vishmi Gunaratne",
          "batter1_score": "0(10)",
          "partnership_score": "6 (20)",
          "batter2": "Chamari Athapaththu",
          "batter2_score": "3 (10)"
        },
        {
          "partnership": "2ND WICKET",
          "batter1": "Chamari Athapaththu",
          "batter1_score": "0(2)",
          "partnership_score": "0 (2)",
          "batter2": "Harshitha Madavi\nSamarawickrama",
          "batter2_score": "0 (0)"
        },
        {
          "partnership": "3RD WICKET",
          "batter1": "Harshitha Madavi\nSamarawickrama",
          "batter1_score": "9(17)",
          "partnership_score": "19 (23)",
          "batter2": "Kavisha Dilhari",
          "batter2_score": "5 (6)"
        },
        {
          "partnership": "4TH WICKET",
          "batter1": "Harshitha Madavi\nSamarawickrama",
          "batter1_score": "11(11)",
          "partnership_score": "18 (20)",
          "batter2": "Nilakshi de Silva",
          "batter2_score": "7 (9)"
        }
      ]
    };

    this.match_info = scorecardData.match_info;
    this.batting = scorecardData.batting;
    this.bowling = scorecardData.bowling;
    this.fall_of_wickets = scorecardData.fall_of_wickets;
    this.partnerships = scorecardData.partnerships;
  }
}
