import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.css']
})
export class TermsOfServiceComponent implements OnInit {

  effectiveDate: string = new Date().toLocaleDateString(); // Sets today's date as the effective date


  constructor() { }

  ngOnInit() {
  }

}
