import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  ILoginReq,
  ILogoutRes,
  IUpdateProfileReq,
  IUpdateProfileRes,
} from 'src/app/modules/auth/models/auth';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { gsap } from 'gsap';
import { MenuItem, MessageService } from 'primeng/api';
import { GroupsService } from '../../modules/instructor/modules/groups/services/groups.service';
import { IGroupDetailsRes } from '../../modules/instructor/modules/groups/models/groups';
import { QuizItemComponent } from '../../modules/instructor/modules/quizzes/components/quiz-item/quiz-item.component';
import {
  IQuizRequest,
  IQuizResponse,
  IQuizResponseByID,
} from '../../modules/instructor/modules/quizzes/models/quizzes';
import { QuizCreatedComponent } from '../../modules/instructor/modules/quizzes/components/quiz-created/quiz-created.component';
import { MatDialog } from '@angular/material/dialog';
import { QuizzesService } from '../../modules/instructor/modules/quizzes/services/quizzes.service';
import { IQuiz } from '../home/models/home';
import { QuizPopComponent } from '../../modules/student/modules/quizzes/components/quiz-pop/quiz-pop.component';
import { StudentQuizService } from '../../modules/student/modules/quizzes/service/studentQuiz.service';
import { IStudentQuiz } from '../../modules/student/modules/quizzes/models/studentQuiz';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('mainNav', { static: true }) mainNav!: ElementRef<HTMLDivElement>;
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
  items: MenuItem[] = [];

  @Input() sidebarCollapsed: boolean = false;
  @Output() closeSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private _Router: Router,
    private _AuthService: AuthService,
    private _HelperService: HelperService,
    private _GroupsService: GroupsService,
    public dialog: MatDialog,
    private _QuizzesService: QuizzesService,
    private _StudentQuiz: StudentQuizService
  ) {}

  ngOnInit(): void {
    this.handleRouteChange();
    this.handleRouteEvents();
    this.getLoggedInUserData();
    this.initializeMenuItems();
  }

  getLoggedInUserData(): void {
    this._AuthService.loggedInUser$.subscribe((loggedInUser: ILoginReq) => {
      this.loggedInUser = loggedInUser;
      // console.log(
      //   'Received loggedInUser data in NavbarComponent:',
      //   this.loggedInUser
      // );
    });
  }

  private handleRouteChange(): void {
    const fullPath = this._Router.url;
    const segments = fullPath.split('/');
    if (segments.length > 0) {
      const specificSegment = segments[segments.length - 1];
      if (this.isQuizId(specificSegment)) {
        this._QuizzesService.getQuizByID(specificSegment).subscribe({
          next: (res: IQuizResponseByID) => (this.routePath = res.title),
          error: (error: HttpErrorResponse) => {
            this._GroupsService.getGroupById(specificSegment).subscribe({
              next: (res: IGroupDetailsRes) => (this.routePath = res.name),
              error: (error: HttpErrorResponse) => {
                this._StudentQuiz.quizWithoutAnswer(specificSegment).subscribe({
                  next: (res: IStudentQuiz) => (this.routePath = res.data.title),
                  error: (error: HttpErrorResponse) => {
                    this.routePath = specificSegment.replaceAll('-', ' ')
                  }
                })
              },
            });
          },
        });
      } else if (specificSegment.includes('-')) {
        this.routePath = specificSegment.replaceAll('-', ' ');
      } else {
        this.routePath = specificSegment;
      }
    }
  }

  isQuizId(segment: string): boolean {
    return /^[0-9a-fA-F]{24}$/.test(segment);
  }

  handleRouteEvents(): void {
    this._Router.events
      .pipe(filter((event) => event instanceof NavigationEnd)) // NavigationEnd m3nah completion of a navigation cycle bardo m3nah router successfully navigates to a new route
      .subscribe(() => {
        this.handleRouteChange();
      });
  }

  onCloseSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.closeSidebar.emit(this.sidebarCollapsed);
  }

  ngAfterViewInit(): void {
    this.initAnimation();
  }

  initAnimation(): void {
    gsap.from(this.mainNav.nativeElement.children, {
      delay: 0.6,
      duration: 0.4,
      opacity: 0,
      y: -60,
      stagger: 0.2,
    });
  }

  logout(): void {
    localStorage.clear();
    this._Router.navigate(['/auth/login']);
  }

  initializeMenuItems(): void {
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        tooltipOptions: {
          tooltipLabel: 'SignOut',
          positionLeft: -140,
        },
        command: () => {
          this.logout();
        },
      },
      {
        label: 'Update',
        icon: 'pi pi-pencil',
        tooltipOptions: {
          tooltipLabel: 'Update Profile',
          positionLeft: -185,
        },
        command: () => {
          this.onUpdateProfile();
        },
      },
      {
        label: 'Change',
        icon: 'pi pi-pencil',
        tooltipOptions: {
          tooltipLabel: 'Change Password',
          positionLeft: -210,
        },
        command: () => {
          this.openChangePass();
        },
      },
    ];
  }

  onUpdateProfile() {
    this._Router.navigate(['/auth/update-profile']);
  }

  onLogout() {
    this._AuthService.logout().subscribe({
      next: (res: ILogoutRes) => {
        this._HelperService.success(res.message);
        localStorage.removeItem('userToken');
      },
      error: (err: HttpErrorResponse) => {
        this._HelperService.error(err.error.message);
      },
      complete: () => {
        this._Router.navigate(['/auth/login']);
      },
    });
  }

  openChangePass() {
    this._Router.navigate(['/auth/change-password']);
  }

  getUpdatedProfileData(): void {
    this._AuthService.profileUpdatedData$.subscribe({
      next: (res: IUpdateProfileRes) =>
        (this.userName = res.data.first_name + res.data.last_name),
    });
  }
  //add new quiz button
  //handle add
  openAddDailog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    add: boolean
  ): void {
    const dialogRef = this.dialog.open(QuizItemComponent, {
      width: '850px',
      height: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        add: add,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addnewQuiz(result);
      }
    });
  }
  addnewQuiz(newQuizData: IQuizRequest) {
    this._QuizzesService.AddNewQuiz(newQuizData).subscribe({
      next: (res: IQuizResponse) => {
        this.openCreatedQuizDailog('1000ms', '1000ms', res.data.code);
      },
      error: (error) => {
        this._HelperService.error(error);
      },
      complete: () => {
        this._HelperService.success('Quiz added sucessfully');
        this._Router.navigateByUrl('/dashboard/instructor/quizzes');
      },
    });
  }
  openCreatedQuizDailog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    code: string
  ): void {
    const dialogRef = this.dialog.open(QuizCreatedComponent, {
      width: '400px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        code: code,
      },
    });
  }

  openJoinDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(QuizPopComponent, {
      width: '400px',
      height: '230px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result: any) => {});
  }
}
