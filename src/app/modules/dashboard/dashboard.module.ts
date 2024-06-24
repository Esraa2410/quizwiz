import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from '../auth/services/auth.service';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [DashboardComponent, SidebarComponent, NavbarComponent, HomeComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
  providers: [AuthService],
})
export class DashboardModule {}
