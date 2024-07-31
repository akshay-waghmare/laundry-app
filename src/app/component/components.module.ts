import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatDividerModule,
        MatDialog,
        MatDialogModule,
        MatCardModule} from '@angular/material';
import { InjectableRxStompConfig, RxStompService, StompConfig, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from '../loader/loader.interceptor';
import { environment } from 'src/environments/environment';
import { LogoutFormComponent } from '../logout-form/logout-form.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    RouterModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  declarations: [
    SidebarComponent,
    NavbarComponent,
    LogoutFormComponent
  ],
  entryComponents: [
    LogoutFormComponent // Ensure the component is in entryComponents
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    LogoutFormComponent
  ],

  providers: [RxStompService,
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }]
})
export class ComponentsModule { }
