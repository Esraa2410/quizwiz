import { Question, Options } from './../../../quizzes/models/quizzes';
import { IBreadCrumb } from 'src/app/modules/shared/models/shared';
import { Component, OnInit } from '@angular/core';
import { QuizzesService } from '../../../quizzes/services/quizzes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IQuizResponseByID } from '../../../quizzes/models/quizzes';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.scss']
})
export class ResultsViewComponent implements OnInit {
  quizId: string = '';
  opts: Options = {
    A: '',
    B: '',
    C: '',
    D: '',
    _id: '',
  }
  quests: Question[] = [
    {
      _id: '',
      title: '',
      options: this.opts,
      answer: '',
    }

  ]
  quizDtails: IQuizResponseByID = {
    _id: '',
    code: '',
    title: '',
    description: '',
    status: '',
    instructor: '',
    group: '',
    questions_number: 0,
    questions: this.quests,
    schadule: '',
    duration: 0,
    score_per_question: 0,
    type: '',
    difficulty: '',
    updatedAt: '',
    createdAt: '',
    __v: 0
  }

  navigationList: IBreadCrumb[] = [
    { label: 'Results', url: '/dashboard/instructor/results' },
    { label: 'Results Veiw' },
  ];

  tableHeaders: string[] = ['title', 'description', 'difficulty'];
  displayHeaders: { [key: string]: string } = {
    title: 'Student Name',
    description: 'Score',
    difficulty: 'Average'
  };
  constructor(private _QuizzesService: QuizzesService, private _ActivatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      this.quizId = params['id'];
    });

    this.getQuizDetails(this.quizId);

  }

  getQuizDetails(id: string) {
    this._QuizzesService.getQuizByID(id).subscribe({
      next: (res: IQuizResponseByID) => {
        console.log(res);
        this.quizDtails = res;
      }, error: (err: HttpErrorResponse) => {
        console.log(err);
      }

    })
  }


}
