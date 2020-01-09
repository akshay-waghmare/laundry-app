import { AddCustomerComponent } from './../../add-customer/add-customer.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {AddServiceComponent} from '../../add-service/add-service.component';
import { ServiceListComponent } from 'src/app/service-list/service-list.component';
import { CustomerListComponent } from '../../customer-list/customer-list.component';
import { AddFullerComponent } from '../../add-fuller/add-fuller.component';
import { FullerListComponent } from '../../fuller-list/fuller-list.component';

export const AdminLayoutsRoute: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-service', component: AddServiceComponent },
  { path: 'service-list', component: ServiceListComponent},
  { path: 'add-customer', component: AddCustomerComponent},
  { path: 'customer-list', component: CustomerListComponent},
  { path: 'add-fuller', component: AddFullerComponent},
  { path: 'fuller-list', component: FullerListComponent},
 ];

