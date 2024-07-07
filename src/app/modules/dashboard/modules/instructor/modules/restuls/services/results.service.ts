import { Root2 } from './../models/results';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  constructor(private _HttpClient: HttpClient) {}

  private resultView = new BehaviorSubject<Root2>({
    quiz: {
      _id: '',
      code: '',
      title: '',
      description: '',
      status: '',
      instructor: '',
      group: '',
      questions_number: 0,
      schadule: '',
      duration: 0,
      score_per_question: 0,
      type: '',
      difficulty: '',
      updatedAt: '',
      createdAt: '',
      __v: 0,
      closed_at: '',
    },
    participants: [],
  });

  result$ = this.resultView.asObservable();

  getResultView(row: Root2) {
    this.resultView.next(row);
  }

  allResults(): Observable<Root2[]> {
    return this._HttpClient.get<Root2[]>(`quiz/result`);
  }
}
