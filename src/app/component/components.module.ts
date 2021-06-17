import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatDividerModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
  ],
  declarations: [
    SidebarComponent,
    NavbarComponent,
  ],
  exports: [
    SidebarComponent,
    NavbarComponent
  ]
})
export class ComponentsModule { }
