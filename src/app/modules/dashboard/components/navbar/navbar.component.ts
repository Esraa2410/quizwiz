import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ILoginReq } from 'src/app/modules/auth/models/auth';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  activeMenu: boolean = false;
  routePath: string = '';
  loggedInRole: string = localStorage.getItem('role') ?? '';
  userName: string = localStorage.getItem('userName') ?? '';
  loggedInUser: ILoginReq = {
    data: {
      accessToken: '',
      profile: {
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        status: '',
      },
      refreshToken: '',
    },
    message: '',
  };

  constructor(private _Router: Router, private _AuthService: AuthService) {

  }

  ngOnInit(): void {
    this.handleRouteEvents();
    this.handleRouteChange();
    this.getLoggedInUserData();
  }

  getLoggedInUserData(): void {
    this._AuthService.loggedInUser$.subscribe((loggedInUser: ILoginReq) => {
      this.loggedInUser = loggedInUser;
      console.log('Received loggedInUser data in NavbarComponent:', this.loggedInUser);
    });

  }


  private handleRouteChange(): void {
    const fullPath = this._Router.url;
    // full path ya gda3an
    console.log('Full path:', fullPath);

    // full path bs array
    const segments = fullPath.split('/');
    console.log('URL Segments:', segments);

    // a5er 7aga f el path
    if (segments.length > 0) {
      const specificSegment = segments[segments.length - 1];
      console.log('Specific segment:', specificSegment);
      this.routePath = specificSegment;
    }
  }

  handleRouteEvents(): void {
    this._Router.events
      .pipe(filter((event) => event instanceof NavigationEnd)) // NavigationEnd m3nah completion of a navigation cycle bardo m3nah router successfully navigates to a new route
      .subscribe(() => {
        this.handleRouteChange();
      });
  }
}
