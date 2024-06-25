import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuiz, IStudent } from '../models/home';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _HttpClient: HttpClient) {}

  upComingFive(): Observable<IQuiz[]> {
    return this._HttpClient.get<IQuiz[]>('quiz/incomming')
  }

  topFiveStudents(): Observable<IStudent[]> {
    return this._HttpClient.get<IStudent[]>('student/top-five')
  }
}
