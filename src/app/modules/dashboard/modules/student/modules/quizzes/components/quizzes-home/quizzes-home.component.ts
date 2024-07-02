import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IBreadCrumb } from 'src/app/modules/shared/models/shared';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { StudentQuizService } from '../../service/studentQuiz.service';
import { QuizPopComponent } from '../quiz-pop/quiz-pop.component';

@Component({
  selector: 'app-quizzes-home',
  templateUrl: './quizzes-home.component.html',
  styleUrls: ['./quizzes-home.component.scss']
})
export class QuizzesHomeComponent {
  navigationList: IBreadCrumb[] = [
    { label: 'dashboard', url: '/dashboard' },
    { label: 'Quizes' },
  ];
  //will be edited
  upcomingQuizzes = [];
  completedQuizes = [];
  tableHeaders: string[] = [
    'title',
    'description',
    'participants',
    'difficulty',
  ];
  displayHeaders: { [key: string]: string } = {
    title: 'Title',
    description: 'Description',
    participants: 'Participants',
    difficulty: 'Difficulty',
  };

  constructor(
    private _Router: Router,
    private _HelperService: HelperService,
    private _StudentQuizService: StudentQuizService,
    public dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.upComingQuizes();
    this.getCompletedQuizes();
  }

  upComingQuizes(): void {
    this._StudentQuizService.getIcomingQuizes().subscribe((quizzes) => {
      this.upcomingQuizzes = quizzes;
    });
  }
  getCompletedQuizes(): void {
    this._StudentQuizService.getCompletedQuizes().subscribe((res) => {
      this.completedQuizes = res;
    });
  }

  openJoinDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    const dialogRef = this.dialog.open(QuizPopComponent, {
      width: '400px',
      height: '230px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result: any) => {  });
  }

  willBeViewed(event: string) {
    this._Router.navigateByUrl(
      `dashboard/student/quizzes/student-quiz/${event}`
    );
  }
}
