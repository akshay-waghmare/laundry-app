import { Component, OnInit } from '@angular/core';


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

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

}
