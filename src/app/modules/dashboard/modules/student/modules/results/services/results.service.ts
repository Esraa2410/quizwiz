import { IResultsRes } from './../models/results';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


Observable
@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private resultView = new BehaviorSubject<IResultsRes>(
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
  )

  result$ = this.resultView.asObservable();

  getResultView(row: IResultsRes) {
    this.resultView.next(row)
  }

  constructor(private _HttpClient: HttpClient) { }

  getAllResults(): Observable<IResultsRes[]> {
    return this._HttpClient.get<IResultsRes[]>('quiz/result')
  }
}
