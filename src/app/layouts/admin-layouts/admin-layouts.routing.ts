import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {AddServiceComponent} from '../../add-service/add-service.component';
import { ServiceListComponent } from 'src/app/service-list/service-list.component';

export const AdminLayoutsRoute: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-service', component: AddServiceComponent },
  { path: 'service-list', component: ServiceListComponent}, ];

