import { AddCustomerComponent } from './../../add-customer/add-customer.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {AddServiceComponent} from '../../add-service/add-service.component';
import { ServiceListComponent } from 'src/app/service-list/service-list.component';
import { CustomerListComponent } from '../../customer-list/customer-list.component';
import { AddFullerComponent } from '../../add-fuller/add-fuller.component';
import { FullerListComponent } from '../../fuller-list/fuller-list.component';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthenticationGuard } from 'src/app/authentication.guard';
import { BetMarketComponent } from 'src/app/bet-market/bet-market.component';

export const AdminLayoutsRoute: Routes = [
  { path: 'dashboard', component: DashboardComponent ,canActivate: [ AuthenticationGuard ]},
  { path: 'add-service', component: AddServiceComponent },
  { path: 'football', component: ServiceListComponent},
  { path: 'add-customer', component: AddCustomerComponent},
  { path: 'customer-list', component: CustomerListComponent},
  { path: 'add-fuller', component: AddFullerComponent},
  { path: 'fuller-list', component: FullerListComponent},
  { path: 'bet-market/:id', component: BetMarketComponent}, ];

