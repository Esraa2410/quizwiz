import { Component, OnInit } from '@angular/core';
import { IQuiz, IStudent } from './models/home';
import { HomeService } from './service/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  upcomingQuizzes: IQuiz[] = [];
  topFiveStudents: IStudent[] = [];
  RouterLinkPath ='/dashboard/instructor/quizzes/view-Quiz';
  constructor(private homeService: HomeService) {}

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
