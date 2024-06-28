import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from '../auth/services/auth.service';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { MessageService } from 'primeng/api';
import { HomeService } from './components/home/service/home.service';
import { GroupsService } from './modules/instructor/modules/groups/services/groups.service';


@NgModule({
  declarations: [DashboardComponent, SidebarComponent, NavbarComponent, HomeComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, SpeedDialModule],
  providers: [AuthService, MessageService, HomeService, GroupsService],
})
export class DashboardModule {}
