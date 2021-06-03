import { AddCustomerComponent } from './../../add-customer/add-customer.component';
import { RouterModule } from '@angular/router';
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

import {
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTableModule,
  MatIconModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from 'src/app/authentication.guard';
import { BetMarketComponent } from 'src/app/bet-market/bet-market.component';
import { StompService, StompConfig ,rxStompServiceFactory ,RxStompService, InjectableRxStompConfig  } from '@stomp/ng2-stompjs';

const myRxStompConfig: InjectableRxStompConfig = {
  // added '/websocket' for spring boot SockJS
  brokerURL: 'ws://127.0.0.1:8099/ws/websocket',
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
    MatIconModule
  ],
  declarations: [
    DashboardComponent,
    AddServiceComponent,
    ServiceListComponent,
    AddCustomerComponent,
    CustomerListComponent,
    AddFullerComponent,
    FullerListComponent,
    BetMarketComponent

  ],
  providers: [
    RxStompService,
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

