import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from '../auth/services/auth.service';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [DashboardComponent, SidebarComponent, NavbarComponent, HomeComponent],
  imports: [
    CommonModule,
     DashboardRoutingModule, 
     SharedModule,
     MatIconModule,
     MatMenuModule,
     MatButtonModule

    ],
  providers: [AuthService],
})
export class DashboardModule {}
