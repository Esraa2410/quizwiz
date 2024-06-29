import { Component, OnInit } from '@angular/core';
import { IQuiz, IStudent } from './models/home';
import { HomeService } from './service/home.service';
import { MatDialog } from '@angular/material/dialog';
import { VeiwDeleteStudentComponent } from '../../modules/instructor/modules/students/components/veiw-delete-student/veiw-delete-student.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  upcomingQuizzes: IQuiz[] = [];
  topFiveStudents: IStudent[] = [];
  RouterLinkPath = '/dashboard/instructor/quizzes/view-Quiz';
  RouterLinkPath2 = '/dashboard/instructor/students/view-Quiz';
  constructor(private homeService: HomeService, private _Router: Router, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.upComingExams();
    this.topStudents();
  }

  upComingExams(): void {
    this.homeService.upComingFive().subscribe((quizzes) => {
      this.upcomingQuizzes = quizzes;
    });
  }

  topStudents(): void {
    this.homeService.topFiveStudents().subscribe((students) => {
      this.topFiveStudents = students;
    });
  }
  willBeViewed(event: string) {
    this._Router.navigateByUrl(`dashboard/instructor/quizzes/view-Quiz/${event}`)
  }


  willBeViewedStudent(event: string): any {
    console.log(event)
    let btnText = 'veiw'
    const dialogRef = this.dialog.open(VeiwDeleteStudentComponent, {
      width: '570px',
      height: '350px',
      data: {
        id: event,
        btnText: btnText
      }
    });

  }


  willBeDeleteStudent(event: string): any {
    console.log(event);
    let btnText = 'delete'
    const dialogRef = this.dialog.open(VeiwDeleteStudentComponent, {
      width: '570px',
      height: '350px',
      data: {
        id: event,
        btnText: btnText
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.topStudents();
    })
  }
}




