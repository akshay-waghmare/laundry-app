import { AddCustomerComponent } from './../../add-customer/add-customer.component';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutsRoute } from './admin-layouts.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AddServiceComponent } from '../../add-service/add-service.component';
import { ServiceListComponent } from '../../service-list/service-list.component';
import { CustomerListComponent } from '../../customer-list/customer-list.component';
import { AddFullerComponent } from '../../add-fuller/add-fuller.component';
import { FullerListComponent } from '../../fuller-list/fuller-list.component';
import { LoginComponent } from 'src/app/login/login.component';
import { TennisService } from 'src/app/tennis-card-list/tennis-list/tennis.service';
import { TennisaRankingService } from 'src/app/tennis-card-list/tennis-list/tennis-ranking/tennisa-ranking.service';
import { LogoutFormComponent } from 'src/app/logout-form/logout-form.component';

import {
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTableModule,
  MatIconModule,
  MatCardModule,
  MatTabsModule,
  MatDividerModule,
  MatGridListModule,
  MatToolbarModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  DateAdapter,
  MAT_DATE_LOCALE,
  MatList,
  MatListModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from 'src/app/authentication.guard';
import { BetMarketComponent } from 'src/app/bet-market/bet-market.component';
import { StompService, StompConfig ,rxStompServiceFactory ,RxStompService, InjectableRxStompConfig  } from '@stomp/ng2-stompjs';
import { FootballCardListComponent } from 'src/app/football-card-list/football-card-list.component';
import { TennisListComponent } from 'src/app/tennis-card-list/tennis-list/tennis-list.component';
import { TennisCardListComponent } from 'src/app/tennis-card-list/tennis-card-list.component';
import { TennisRankingComponent } from 'src/app/tennis-card-list/tennis-list/tennis-ranking/tennis-ranking.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { CricketOddsComponent } from 'src/app/cricket-odds/cricket-odds.component';
import { BetHistoryComponent } from 'src/app/bet-history/bet-history.component';
import { environment } from 'src/environments/environment';
import { ComponentsModule } from 'src/app/component/components.module';
import { ProfitLossComponent } from 'src/app/profit-loss/profit-loss.component';

const myRxStompConfig: InjectableRxStompConfig = {
  // added '/websocket' for spring boot SockJS
  brokerURL: environment.ws.brokerURL,
  connectHeaders: {
    login: 'guest',
    passcode: 'guest'
  },
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000, // 20000 - every 20 seconds
  reconnectDelay: 5000,
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutsRoute),
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
    MatGridListModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatMomentDateModule,
    MatListModule,
    ComponentsModule
    
  
  ],
  declarations: [
    DashboardComponent,
    AddServiceComponent,
    ServiceListComponent,
    AddCustomerComponent,
    CustomerListComponent,
    AddFullerComponent,
    FullerListComponent,
    BetMarketComponent,
    FootballCardListComponent,
    TennisListComponent,
    TennisCardListComponent,
    TennisRankingComponent,
    CricketOddsComponent,
    BetHistoryComponent,
    ProfitLossComponent
    
  ],
  providers: [
    
    RxStompService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ],
  exports: [
    RouterModule
  ],
})
export class AdminLayoutsModule {
}

