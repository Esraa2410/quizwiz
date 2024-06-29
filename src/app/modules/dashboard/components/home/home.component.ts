import { Component, OnInit } from '@angular/core';
import { IQuiz, IStudent } from './models/home';
import { HomeService } from './service/home.service';
import { MatDialog } from '@angular/material/dialog';
import { VeiwDeleteStudentComponent } from '../../modules/instructor/modules/students/components/veiw-delete-student/veiw-delete-student.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  upcomingQuizzes: IQuiz[] = [];
  topFiveStudents: IStudent[] = [];
  RouterLinkPath ='/dashboard/instructor/quizzes/view-Quiz';
  constructor(private homeService: HomeService , private dialog :MatDialog) {}

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



}
