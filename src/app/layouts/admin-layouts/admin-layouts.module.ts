import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutsRoute } from './admin-layouts.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AddServiceComponent } from '../../add-service/add-service.component';
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
  ],
  exports: [
    RouterModule
  ],
})
export class AdminLayoutsModule {
}

