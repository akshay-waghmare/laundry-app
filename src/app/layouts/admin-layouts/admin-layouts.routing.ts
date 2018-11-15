import { Routes } from '@angular/router';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {AddServiceComponent} from '../../add-service/add-service.component';

export const AdminLayoutsRoute: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-service', component: AddServiceComponent }, ];

