import { Component, inject } from '@angular/core';
import { QuestionsService } from './services/questions.service';
import { IBreadCrumb, IButtonConfig } from 'src/app/modules/shared/models/shared';
import { IQuestion } from './models/questions';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentGroupComponent } from '../students/components/add-student-group/add-student-group.component';
import { AddNewQuestionComponent } from './components/add-question/add-new-question/add-new-question.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {
  navigationList: IBreadCrumb[] = [
    { label: 'dashboard', url: '/dashboard' },
    { label: 'Questions' },
  ];
  btnText: string = 'Add question';
  btnIcon: string = 'fa fa-plus-circle';

  questionList!: IQuestion[];
  paginatedList!: IQuestion[];
  tableHeaders: string[] = [
    'title',
    'description',
    'difficulty',
    'actions',
  ];
  displayHeaders: { [key: string]: string } = {
    title: 'Question Title',
    description: 'Question Desc',
    difficulty: 'Question Difficulty',
    actions: 'Actions',
  };

  buttons: IButtonConfig[] = [
    {
      btnIcon: 'fa-solid fa-pen-to-square',
      action: (row) => this.updateFunction(row),
      class: 'yellow-color'
    },
    {
      btnIcon: 'fa-solid fa-trash',
      action: (row) => this.deleteFunction(row),
      class: 'yellow-color'
    },
    {
      btnIcon: 'fa-solid fa-eye',
      action: (row) => this.viewFunction(row),
      class: 'yellow-color'
    }
  ];
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;

  private _QuestionService = inject(QuestionsService);
  private _HelperService = inject(HelperService);

   
    constructor( public dialog: MatDialog){}

  ngOnInit(): void {
    this.getAllQuestions();
  }

  updateFunction(row: IQuestion): void {
    console.log('Update', row);
  }

  deleteFunction(row: IQuestion): void {
    console.log('Delete', row);
  }

  viewFunction(row: IQuestion): void {
    console.log('View', row);
  }

  getAllQuestions(): void {
    this._QuestionService.questions().subscribe({
      next: (res: IQuestion[]) => {
        this.questionList = res
        this.totalRecords = res.length;
        this.updatePaginatedData();
      },
      error: (error: HttpErrorResponse) => this._HelperService.error(error)
    })
  }

  openAddDailog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(AddNewQuestionComponent, {
      width: '550px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  updatePaginatedData(): void {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedList = this.questionList.slice(start, end);
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
