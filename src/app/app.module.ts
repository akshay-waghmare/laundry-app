import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from '../app/app.routing';
import { AdminLayoutsComponent } from './layouts/admin-layouts/admin-layouts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import {ComponentsModule} from '../app/component/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import 'hammerjs';
import { LoginComponent } from './login/login.component';
import {
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationGuard } from './authentication.guard';
import { TokenStorage } from './token.storage';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { LoaderInterceptor } from './loader/loader.interceptor';
import { StompService, StompConfig } from '@stomp/ng2-stompjs';
import { ElapsedTimePipe } from './utils/elapsed-time.pipe';
import { CustomReuseStrategy } from './custom-reuse-strategy';
import { environment } from 'src/environments/environment';
import { LogoutFormComponent } from './logout-form/logout-form.component';
import { AccountStatementComponent } from './account-statement/account-statement.component';
//import { MatButtonModule } from '@angular/material/button';


const stompConfig: StompConfig = {
  // added '/websocket' for spring boot SockJS
  url: environment.ws.brokerURL,
  headers: {
    login: 'guest',
    passcode: 'guest'
  },
  heartbeat_in: 0,
  heartbeat_out: 20000, // 20000 - every 20 seconds
  reconnect_delay: 5000,
  debug: true
};


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutsComponent,
    LoginComponent,
    LoaderComponent,
    ElapsedTimePipe,
        
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    ComponentsModule,
    BrowserAnimationsModule,
    MatRippleModule,
    MatFormFieldModule,
    MatButtonModule,   
    MatInputModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule
    
  ],

  entryComponents: [ LogoutFormComponent ],

  providers: [AuthenticationGuard,TokenStorage,
    LoaderService,
    HttpClientModule,
    StompConfig,
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    { provide: HTTP_INTERCEPTORS,useValue: stompConfig, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent],
  
  // exports: [SidebarComponent]
})
export class AppModule { }
