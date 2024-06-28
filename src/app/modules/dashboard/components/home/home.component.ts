import { Component, OnInit } from '@angular/core';
import { IQuiz, IStudent } from './models/home';
import { HomeService } from './service/home.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  upcomingQuizzes: IQuiz[] = [];
  topFiveStudents: IStudent[] = [];
  RouterLinkPath ='/dashboard/instructor/quizzes/view-Quiz';
  constructor(private homeService: HomeService ,private _Router:Router) {}

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
  willBeViewed(event:string){
    this._Router.navigateByUrl(`dashboard/instructor/quizzes/view-Quiz/${event}`)
}
}
