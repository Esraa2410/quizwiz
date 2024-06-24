import { Component, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { Role } from 'src/app/core/enums/role.enum';
import { gsap } from 'gsap';

interface IList {
  routeLink: string;
  routeName: string;
  routeIcon: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {
  @Input() activeMenu: boolean = false;
  instructorRole: string = '';
  studentRole: string = localStorage.getItem('role') ?? '';
  @Output() sidebarCollapsing: EventEmitter<boolean> = new EventEmitter<boolean>();

  dashboardMenu: IList[] = [
    {
      routeName: 'Dashboard',
      routeLink: '/dashboard',
      routeIcon: 'fa-solid fa-home'
    },
    {
      routeName: 'Groups',
      routeLink: '/dashboard/instructor/groups',
      routeIcon: 'bi bi-people'
    },
    {
      routeName: 'Quizzes',
      routeLink: '/dashboard/instructor/quizzes',
      routeIcon: 'fa-solid fa-person-chalkboard'
    },
    {
      routeName: 'Result',
      routeLink: '/dashboard/instructor/result',
      routeIcon: 'fas fa-list-alt'
    },
    {
      routeName: 'Help',
      routeLink: '/dashboard/contact-us',
      routeIcon: 'fa-solid fa-question'
    }
  ];

  @ViewChild('navigation', { static: true }) navigation!: ElementRef<HTMLDivElement>;

  loggedInRole(): void {
    if (localStorage.getItem('role') == Role.instructor) {
      this.instructorRole = Role.instructor;
    } else if (localStorage.getItem('role') == Role.student) {
      this.studentRole = Role.student;
    }
  }

  ngAfterViewInit(): void {
    this.animateNavigation();
  }

  animateNavigation(): void {
    // if (this.navigation) {
    //   gsap.from(this.navigation, {
    //     delay: 0.3,
    //     duration: 0.4,
    //     opacity: 0,
    //     y: -20,
    //     stagger: 0.1,
    //   });
    // }
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
    this.sidebarCollapsing.emit(this.activeMenu);
  }
}
