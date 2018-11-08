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

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ComponentsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [SidebarComponent]
})
export class AppModule { }
