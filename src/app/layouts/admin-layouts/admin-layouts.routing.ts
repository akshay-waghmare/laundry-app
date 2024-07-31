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
import { HomeComponent } from 'src/app/home/home.component';

import { CricketOddsComponent } from 'src/app/cricket-odds/cricket-odds.component';
import { BetHistoryComponent } from 'src/app/bet-history/bet-history.component';
import { LogoutFormComponent } from 'src/app/logout-form/logout-form.component';
import { ProfitLossComponent } from 'src/app/profit-loss/profit-loss.component';
import { ScrapeControlComponent } from 'src/app/scrape-control/scrape-control.component';

export const AdminLayoutsRoute: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard] },
  { path: 'add-service', component: AddServiceComponent, canActivate: [AuthenticationGuard] },
  { path: 'football', component: ServiceListComponent, canActivate: [AuthenticationGuard] },
  { path: 'add-customer', component: AddCustomerComponent, canActivate: [AuthenticationGuard] },
  { path: 'customer-list', component: CustomerListComponent, canActivate: [AuthenticationGuard] },
  { path: 'cric-live/:path', component: CricketOddsComponent, canActivate: [AuthenticationGuard] },
  { path: 'add-fuller', component: AddFullerComponent, canActivate: [AuthenticationGuard] },
  { path: 'fuller-list', component: FullerListComponent, canActivate: [AuthenticationGuard] },
  { path: 'bet-market/:id', component: BetMarketComponent, canActivate: [AuthenticationGuard] },
  { path: 'tennis', component: TennisListComponent, canActivate: [AuthenticationGuard] },
  { path: 'tennis/atp/ranking', component: TennisRankingComponent, canActivate: [AuthenticationGuard] },
  { path: 'tennis/wta/ranking', component: TennisRankingComponent, canActivate: [AuthenticationGuard] },
  { path: 'account/bet-history', component: BetHistoryComponent, canActivate: [AuthenticationGuard] },
  { path: 'account/profit-loss', component: ProfitLossComponent, canActivate: [AuthenticationGuard] },
  { path: 'scraping', component: ScrapeControlComponent, canActivate: [AuthenticationGuard] },
  { path: 'logout', component: LogoutFormComponent },
  {path:'Home',component:HomeComponent},
];



