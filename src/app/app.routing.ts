import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminLayoutsComponent} from './layouts/admin-layouts/admin-layouts.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
}, {
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
