import { IBreadCrumb } from 'src/app/modules/shared/models/shared';
import { Component, OnInit } from '@angular/core';
import { QuizzesService } from '../../../quizzes/services/quizzes.service';
import { ResultsService } from '../../services/results.service';
import { Root2 } from '../../models/results';


@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.scss']
})
export class ResultsViewComponent implements OnInit {
  quizName:string='';
  quizDetails: Root2 = {
    quiz: {
      _id: '',
      code: '',
      title: '',
      description: '',
      status: '',
      instructor: '',
      group: '',
      questions_number: 0
      , schadule: '',
      duration: 0
      , score_per_question: 0
      , type: '',
      difficulty: '',
      updatedAt: '',
      createdAt: '',
      __v: 0
      , closed_at: '',

    },
    participants: []

  };


  navigationList: IBreadCrumb[] = [
    { label: 'Results', url: '/dashboard/instructor/results' },
    { label: '' },
  ];

  // tableHeaders: string[] = ['participant.first_name', 'score', 'started_at', 'finished_at'];
  // displayHeaders: { [key: string]: string } = {
  //   'participant.first_name': 'Student Name',
  //   score: 'Score',
  //   started_at: 'Started At',
  //   finished_at: 'Finished At'
  // };

  constructor(private _ResultsService: ResultsService, private _QuizzesService: QuizzesService) { }

  ngOnInit(): void {
    this._ResultsService.result$.subscribe((result) => {
      this.quizDetails = result;
      console.log(result)
      this.quizName=this.quizDetails.quiz.title;
      this.navigationList[1].label=this.quizName;
    });
  }

}
