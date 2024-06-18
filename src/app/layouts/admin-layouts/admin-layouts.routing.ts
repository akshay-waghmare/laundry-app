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
import { TennisListComponent } from 'src/app/tennis-card-list/tennis-list/tennis-list.component';
import { TennisRankingComponent } from 'src/app/tennis-card-list/tennis-list/tennis-ranking/tennis-ranking.component';


import { CricketOddsComponent } from 'src/app/cricket-odds/cricket-odds.component';
import { BetHistoryComponent } from 'src/app/bet-history/bet-history.component';
import { LogoutFormComponent } from 'src/app/logout-form/logout-form.component';

export const AdminLayoutsRoute: Routes = [
  { path: 'dashboard', component: DashboardComponent ,canActivate: [ AuthenticationGuard ]},
  { path: 'add-service', component: AddServiceComponent },
  { path: 'football', component: ServiceListComponent},
  { path: 'add-customer', component: AddCustomerComponent},
  { path: 'customer-list', component: CustomerListComponent},
  { path: 'cric-live/:path', component: CricketOddsComponent}, // Add this line
  { path: 'add-fuller', component: AddFullerComponent},
  { path: 'fuller-list', component: FullerListComponent},
  { path: 'bet-market/:id', component: BetMarketComponent}, 
  { path: 'tennis', component: TennisListComponent},
  { path: 'tennis/atp/ranking', component: TennisRankingComponent},
  { path: 'tennis/wta/ranking', component: TennisRankingComponent},
  { path: 'account/bet-history', component: BetHistoryComponent},
  {path: 'logout',component: LogoutFormComponent}
];

