import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/component/sidebar/sidebar.service';

@Component({
  selector: 'app-admin-layouts',
  templateUrl: './admin-layouts.component.html',
  styleUrls: ['./admin-layouts.component.css']
})
export class AdminLayoutsComponent implements OnInit {
  isSidebarVisible = true;
  constructor(private sidebarService: SidebarService) {
    console.log('hello');
  }

  ngOnInit() {
    this.sidebarService.visibility$.subscribe(visible => {
      this.isSidebarVisible = visible;
      console.log('Sidebar visibility toggled:', this.isSidebarVisible); // Log visibility change
    });
  }

  handleToggleSidebar() {
    this.sidebarService.toggleVisibility();
  }

}
