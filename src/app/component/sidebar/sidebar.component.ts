import { Component, OnInit } from '@angular/core';
import { EventListService } from '../event-list.service';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/add-service', title: 'Add Service',  icon: 'note_add', class: '' },
  { path: '/service-list', title: 'Service List', icon: 'list', class: '' },
  { path: '/add-customer', title: 'Add Customer', icon: 'note_add', class: '' },
  { path: '/customer-list', title: 'Customer List', icon: 'list', class: '' },
  { path: '/add-fuller', title: 'Add Fuller', icon: 'note_add', class: '' },
  { path: '/fuller-list', title: 'Fuller List', icon: 'list', class: '' },
  { path: '/invoice-list', title: 'Invoice List', icon: 'list', class: '' },
];

export const N_ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Basketball',  icon: 'dashboard', class: '' },
  { path: '/add-service', title: 'Boxing',  icon: 'note_add', class: '' },
  { path: '/add-s', title: 'Esports',  icon: 'note_add', class: '' },
  { path: '/service-list', title: 'Cricket', icon: 'list', class: '' },
  { path: '/add-customer', title: 'Football', icon: 'note_add', class: '' },
  { path: '/customer-list', title: 'Golf', icon: 'list', class: '' },
  { path: '/add-fuller', title: 'Greyhound Racing', icon: 'note_add', class: '' },
  { path: '/fuller-list', title: 'Horse Racing', icon: 'list', class: '' },
  { path: '/invoice-list', title: 'Tennis', icon: 'list', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  menuItems: any[];
  results: any[];

  constructor(private eventListService: EventListService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    this.eventListService.getEvents().subscribe( data => {
        this.results = data.result;
        this.results = this.results.map(({id, name}, index) => {
         const entry = N_ROUTES.filter(x => x.title === name);
         const icon = entry[0]['icon'];
         return ({id, name, title: name , icon: icon , path: entry[0]['path']});
       } );
       console.log(this.results);
    });

    console.log(this.results);
  }
}
