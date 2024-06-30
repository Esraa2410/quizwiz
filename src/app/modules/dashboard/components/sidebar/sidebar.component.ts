import { Component, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter, Input, HostListener } from '@angular/core';
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
      routeIcon: 'fa-solid fa-users-rectangle'
    },
    {
      routeName: 'Students',
      routeLink: '/dashboard/instructor/students',
      routeIcon: 'fa-solid fa-users'
    },
    {
      routeName: 'Quizzes',
      routeLink: '/dashboard/instructor/quizzes',
      routeIcon: 'fa-solid fa-business-time'
    },
    {
      routeName: 'Questions',
      routeLink: '/dashboard/instructor/questions',
      routeIcon: 'fas fa-list-alt'
    },
    {
      routeName: 'Results',
      routeLink: '/dashboard/instructor/results',
      routeIcon: 'fa-solid fa-square-poll-horizontal'
    }
    // {
    //   routeName: 'Help',
    //   routeLink: '/dashboard/contact-us',
    //   routeIcon: 'fa-solid fa-question'
    // }
  ];

  @ViewChild('aside', { static: true }) aside!: ElementRef;
  @ViewChild('navList', { static: true }) navList!: ElementRef<HTMLUListElement>;

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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // this.asideWidth = this.asideElement.nativeElement.offsetWidth;
    // this.textLinkVisibility = this.asideWidth <= 182;
    // this.arrowVisibility = window.innerWidth <= 991;
  }
}
