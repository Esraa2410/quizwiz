import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  toggleSidebar: boolean = false;

  isCollapsed(data: boolean): void {
    this.toggleSidebar = data;
  }
}
