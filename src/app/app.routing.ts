import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AdminLayoutsComponent} from './layouts/admin-layouts/admin-layouts.component';
import { LoginComponent } from './login/login.component';
import { from } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
},

{
  path: 'login',
  component: LoginComponent,
  pathMatch: 'full',
}, 
{
  path: '',
  component: AdminLayoutsComponent,
  children: [
      {
    path: '',
    loadChildren: './layouts/admin-layouts/admin-layouts.module#AdminLayoutsModule'
}]}];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
