import { Component, OnInit } from '@angular/core';
import { IQuiz, IStudent } from './models/home';
import { HomeService } from './service/home.service';
import { MatDialog } from '@angular/material/dialog';
import { VeiwDeleteStudentComponent } from '../../modules/instructor/modules/students/components/veiw-delete-student/veiw-delete-student.component';
import { Router } from '@angular/router';
import { Role } from 'src/app/core/enums/role.enum';
import { StudentQuizService } from '../../modules/student/modules/quizzes/service/studentQuiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  upcomingQuizzes: IQuiz[] = [];
  topFiveStudents: IStudent[] = [];
  RouterLinkPath = '/dashboard/instructor/quizzes/view-Quiz';
  RouterLinkPath2 = '/dashboard/instructor/students/view-Quiz';
  loggedInRole: string = localStorage.getItem('role') ?? '';
  userName: any;
  email: any;
  role: any;


  constructor(private _StudentQuizService: StudentQuizService, private homeService: HomeService, private _Router: Router, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.upComingExams();
    this.topStudents();
    this.userName = localStorage.getItem('userName');
    this.role = localStorage.getItem('role');
    this.email = localStorage.getItem('email');

  }



 


  upComingExams(): void {
    this.homeService.upComingFive().subscribe((quizzes) => {
      this.upcomingQuizzes = quizzes;
    });
  }

  topStudents(): void {
    if (this.loggedInRole == Role.instructor) {
      this.homeService.topFiveStudents().subscribe((students) => {
        this.topFiveStudents = students;
      });
    }
  }

  willBeViewed(event: string) {
    this._Router.navigateByUrl(
      `dashboard/instructor/quizzes/view-Quiz/${event}`
    );
  }

  willBeViewedStudent(event: string): any {
    let btnText = 'veiw';
    const dialogRef = this.dialog.open(VeiwDeleteStudentComponent, {
      width: '570px',
      height: '350px',
      data: {
        id: event,
        btnText: btnText,
      },
    });
  }

  willBeDeleteStudent(event: string): any {
    let btnText = 'delete';
    const dialogRef = this.dialog.open(VeiwDeleteStudentComponent, {
      width: '570px',
      height: '350px',
      data: {
        id: event,
        btnText: btnText,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.topStudents();
    });
  }
}
