import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AdminLayoutsComponent} from './layouts/admin-layouts/admin-layouts.component';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutsComponent,
    children: [
      {
        path: '',
        redirectTo: 'Home', // Redirect to Home component on load
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: './layouts/admin-layouts/admin-layouts.module#AdminLayoutsModule'
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
