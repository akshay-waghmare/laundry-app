import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  effectiveDate: string = new Date().toLocaleDateString(); // Sets today's date as the effective date


  constructor() { }

  ngOnInit() {
  }

}
