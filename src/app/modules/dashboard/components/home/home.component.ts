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

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.upComingExams();

    this.topStudents();
  }

  getQuizTitle = (quiz: IQuiz): string => quiz.title;
  getQuizDate = (quiz: IQuiz): string => new Date(quiz.schadule).toLocaleDateString();
  getQuizTime = (quiz: IQuiz): string => new Date(quiz.schadule).toLocaleTimeString();
  getNumOfStudents = (quiz: IQuiz): number => quiz.participants;

  getStudentName = (student: IStudent): string => `${student.first_name} ${student.last_name}`;
  getStudentRank = (student: IStudent, index?: number): string => `Class rank: ${index !== undefined ? index + 1 : ''}`;
  getStudentAvgScore = (student: IStudent): string => `Average score: ${student.avg_score.toFixed(2)}`;

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
