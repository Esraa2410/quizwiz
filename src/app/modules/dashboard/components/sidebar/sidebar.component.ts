import { Component, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/core/enums/role.enum';
import { gsap } from 'gsap';

interface IList {
  routeLink: string;
  routeName: string;
  routeIcon: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {
  @Input() activeMenu: boolean = false;
  role: string = localStorage.getItem('role') ?? '';
  @Output() sidebarCollapsing: EventEmitter<boolean> = new EventEmitter<boolean>();
  currentRoute: string = '';

  dashboardMenu: IList[] = [
    {
      routeName: 'Dashboard',
      routeLink: '/dashboard',
      routeIcon: 'fa-solid fa-home',
      isActive: this.role == Role.instructor
    },
    {
      routeName: 'Groups',
      routeLink: '/dashboard/instructor/groups',
      routeIcon: 'fa-solid fa-users-rectangle',
      isActive: this.role == Role.instructor
    },
    {
      routeName: 'Students',
      routeLink: '/dashboard/instructor/students',
      routeIcon: 'fa-solid fa-users',
      isActive: this.role == Role.instructor
    },
    {
      routeName: 'Quizzes',
      routeLink: '/dashboard/instructor/quizzes',
      routeIcon: 'fa-solid fa-business-time',
      isActive: this.role == Role.instructor
    },
    {
      routeName: 'Questions',
      routeLink: '/dashboard/instructor/questions',
      routeIcon: 'fas fa-list-alt',
      isActive: this.role == Role.instructor
    },
    {
      routeName: 'Results',
      routeLink: '/dashboard/instructor/results',
      routeIcon: 'fa-solid fa-square-poll-horizontal',
      isActive: this.role == Role.instructor
    },
    {
      routeName: 'dashboard',
      routeLink: '/dashboard',
      routeIcon: 'fa-solid fa-home',
      isActive: this.role == Role.student
    },
    {
      routeName: 'Quizzes',
      routeLink: '/dashboard/student/quizzes',
      routeIcon: 'fa-solid fa-business-time',
      isActive: this.role == Role.student
    },
    {
      routeName: 'Results',
      routeLink: '/dashboard/student/results',
      routeIcon: 'fa-solid fa-square-poll-horizontal',
      isActive: this.role == Role.student
    },
  ];

  @ViewChild('aside', { static: true }) aside!: ElementRef;
  @ViewChild('navList', { static: true }) navList!: ElementRef<HTMLUListElement>;

  constructor(private router: Router) {
    this.currentRoute = this.router.url;
  }

  ngAfterViewInit(): void {
    this.animateNavigation();
  }

  animateNavigation(): void {
    gsap.from(this.navList.nativeElement.children, {
      delay: 0.6,
      duration: 0.4,
      opacity: 0,
      x: -60,
      stagger: 0.20,
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
    this.sidebarCollapsing.emit(this.activeMenu);
  }
}
