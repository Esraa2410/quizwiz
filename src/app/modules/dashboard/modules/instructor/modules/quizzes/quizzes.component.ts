import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuizItemComponent } from './components/quiz-item/quiz-item.component';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { IBreadCrumb, IButtonConfig } from 'src/app/modules/shared/models/shared';
import { IQuiz, IQuizRequest, IQuizResponse } from './models/quizzes';
import { QuizzesService } from './services/quizzes.service';
import { QuizCreatedComponent } from './components/quiz-created/quiz-created.component';
import { HttpErrorResponse } from '@angular/common/http';
import { IGroupsListRes, IGroupsListRes2 } from '../groups/models/groups';
import { GroupsService } from '../groups/services/groups.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss'],
})
export class QuizzesComponent implements OnInit {
  quizId: string = '';
  navigationList: IBreadCrumb[] = [
    { label: 'dashboard', url: '/dashboard' },
    { label: 'Quizes' },
  ];
  btnText: string = 'Set up a new quiz';
  btnIcon: string = 'fa-regular fa-clock';
  RouterLinkPath: string = './view-Quiz' + this.quizId;
  upcomingQuizzes: IQuiz[] = [];
  completedQuizzes!: IQuiz[];
  paginatedQuizzes!: IQuiz[];
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;
  tableHeaders: string[] = ['title', 'group', 'participants', 'schadule'];
  displayHeaders: { [key: string]: string } = {
    title: 'Title',
    group: 'Group name',
    participants: 'No. of persons in group',
    schadule: 'Date'
  };
  groupMap: { [key: string]: string } = {};


  constructor(
    public dialog: MatDialog,
    private _HelperService: HelperService,
    private _QuizzesService: QuizzesService,
    private _GroupsService: GroupsService
  ) {}
  ngOnInit(): void {
    this.fetchGroups();
  }

  fetchGroups(): void {
    this._GroupsService.getAllGroups().subscribe((groups: IGroupsListRes2[]) => {
      this.groupMap = groups.reduce((acc: { [key: string]: string }, group: IGroupsListRes2) => {
        acc[group._id] = group.name;
        return acc;
      }, {});
      this.upComingQuizes();
      this.getCompletedQuizzes();
    });
  }
  


  upComingQuizes(): void {
    this._QuizzesService.upComingFive().subscribe((quizzes) => {
      this.upcomingQuizzes = quizzes.map((quiz) => ({
        ...quiz,
        group: this.groupMap[quiz.group] || quiz.group
      }));
    });
  }
  
  getCompletedQuizzes(): void {
    this._QuizzesService.completedQuizzes().subscribe({
      next: (res: IQuiz[]) => {
        this.completedQuizzes = res.map((quiz) => ({
          ...quiz,
          group: this.groupMap[quiz.group] || quiz.group
        }));
        this.totalRecords = res.length;
        this.updatePaginatedData();
      },
      error: (error: HttpErrorResponse) => this._HelperService.error(error),
      complete: () => {},
    });
  }
  

  //handle add
  openAddDailog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    add: boolean
  ): void {
    const dialogRef = this.dialog.open(QuizItemComponent, {
      width: '800px',
      height: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        add: add,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('recored added');
      console.log(result);
      if (result) {
        this.addnewQuiz(result);
      }
    });
  }
  addnewQuiz(newQuizData: IQuizRequest) {
    this._QuizzesService.AddNewQuiz(newQuizData).subscribe({
      next: (res: IQuizResponse) => {
        console.log(res);
        this.openCreatedQuizDailog('1000ms', '1000ms', res.data.code);
      },
      error: (error) => {
        this._HelperService.error(error);
      },
      complete: () => {
        this.upComingQuizes();
        this._HelperService.success('Quiz added sucessfully');
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
  getQuizById() {
    this._QuizzesService.getQuizByID('').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => {},
      complete: () => {},
    });
  }

  updatePaginatedData(): void {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedQuizzes = this.completedQuizzes.slice(start, end);
  }

  onPageSizeChange(size: number): void {
    this.rows = size;
    this.first = 0;
    this.updatePaginatedData();
  }

  onPageNumberChange(page: number): void {
    this.first = (page - 1) * this.rows;
    this.updatePaginatedData();
  }
}
