import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './dashboard-routing.animation.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [slideInAnimation]
})
export class DashboardComponent implements AfterViewInit {
  toggleSidebar: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  isCollapsed(data: boolean): void {
    this.toggleSidebar = data;
  }

  getAnimationData(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
