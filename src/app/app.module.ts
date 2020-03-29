import { RouterModule } from '@angular/router';
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
  MatRippleModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationGuard } from './authentication.guard';
import { TokenStorage } from './token.storage';




@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutsComponent,
    LoginComponent
    

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


  ],
  providers: [AuthenticationGuard,TokenStorage],
  bootstrap: [AppComponent],
  // exports: [SidebarComponent]
})
export class AppModule { }
