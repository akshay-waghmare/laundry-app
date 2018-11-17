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

import {
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutsRoute),
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
  ],
  declarations: [
    DashboardComponent,
    AddServiceComponent,
    ServiceListComponent,
    AddCustomerComponent,
    CustomerListComponent,
    AddFullerComponent,
    FullerListComponent,

  ],
  exports: [
    RouterModule
  ],
})
export class AdminLayoutsModule {
}

