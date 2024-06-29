import { Component, inject } from '@angular/core';
import { QuestionsService } from './services/questions.service';
import { IBreadCrumb, IButtonConfig } from 'src/app/modules/shared/models/shared';
import { IQuestion } from './models/questions';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from 'src/app/modules/shared/services/helper.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {
  navigationList: IBreadCrumb[] = [
    { label: 'dashboard', url: '/dashboard' },
    { label: 'Students' },
  ];
  btnText: string = 'Add Student';
  btnIcon: string = 'fa fa-plus-circle';

  questionList!: IQuestion[];
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

  private _QuestionService = inject(QuestionsService);
  private _HelperService = inject(HelperService);

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
      next: (res: IQuestion[]) => this.questionList = res,
      error: (error: HttpErrorResponse) => this._HelperService.error(error),
      complete: () => this._HelperService.success('All Questions Are Retrieved')
    })
  }
}
