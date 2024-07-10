import { IResultsRes } from './../../models/results';
import { IBreadCrumb } from 'src/app/modules/shared/models/shared';
import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-results-veiw',
  templateUrl: './results-veiw.component.html',
  styleUrls: ['./results-veiw.component.scss']
})
export class ResultsVeiwComponent implements OnInit {
  quizName:string='';
  quizDetails: IResultsRes=
   {
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
      __v: 0,
      closed_at: '',

    },
    result: {
      _id: '',
      quiz: {
        _id: '',
        title: '',
      },
      participant: {
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
      },
      score: 0,
      started_at: '',
      finished_at: ''
    }
  }


  navigationList: IBreadCrumb[] = [
    { label: 'Results', url: '/dashboard/student/results' },
    { label: '' },
  ];

  // tableHeaders: string[] = ['participant.first_name', 'score', 'started_at', 'finished_at'];
  // displayHeaders: { [key: string]: string } = {
  //   'participant.first_name': 'Student Name',
  //   score: 'Score',
  //   started_at: 'Started At',
  //   finished_at: 'Finished At'
  // };

  constructor(private _ResultsService: ResultsService) { }

  ngOnInit(): void {
    this._ResultsService.result$.subscribe((result) => {
      this.quizDetails = result;
      this.quizName=this.quizDetails.quiz.title;
      this.navigationList[1].label=this.quizName;
    });
  }

}