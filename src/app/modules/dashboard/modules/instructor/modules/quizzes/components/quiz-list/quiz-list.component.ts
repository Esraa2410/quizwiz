import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IButtonConfig } from 'src/app/modules/shared/models/shared';
import { QuizzesService } from '../../services/quizzes.service';
import { IQuiz } from '../../models/quizzes';
QuizzesService
@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit{
  tableHeaders: string[] = [
    'title',
    'description',
    'status',
    'participants',
    'duration',
    'difficulty',
    'actions',
  ];
  displayHeaders: { [key: string]: string } = {
    title: 'Title',
    description: 'Description',
    status:'Status',
    participants: 'Participants',
    duration:'Duration',
    difficulty:'Difficulty',
    actions: 'Actions',
  };
  buttons: IButtonConfig[] = [
  
    {
      btnIcon: 'fa-solid fa-eye',
      action: (row) => this.viewFunction(row),
      class: 'yellow-color'
    }
   
  ];
  allQuizzes!: IQuiz[];
  paginatedList!: IQuiz[];
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;
  constructor(private _Router: Router ,private _QuizzesService:QuizzesService){

  }
  ngOnInit(): void {
    this.getAllQuizes();
  }
  getAllQuizes(): void {
    this._QuizzesService.getAllQuizes().subscribe((quizzes) => {
      this.allQuizzes = quizzes;
      this.paginatedList=quizzes;
      this.totalRecords = quizzes.length;
      this.updatePaginatedData();
    });
  }
  viewFunction(row: any): void {
    this._Router.navigateByUrl(`/dashboard/instructor/quizzes/view-quiz/${row._id}`)
  }
  updatePaginatedData(): void {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedList = this.allQuizzes.slice(start, end);
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
