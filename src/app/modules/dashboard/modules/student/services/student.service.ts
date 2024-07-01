import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IJoinQuizResponse,
  IStudentQuiz,
  ISubmitQuizReq,
  ISubmitQuizResponse,
} from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private _HttpClient: HttpClient) {}

  quizWithoutAnswer(id: string): Observable<IStudentQuiz> {
    return this._HttpClient.get<IStudentQuiz>(`quiz/without-answers/${id}`);
  }

  joinQuiz(): Observable<IJoinQuizResponse> {
    return this._HttpClient.get<IJoinQuizResponse>('quiz/join');
  }

  submitQuiz(
    quizData: ISubmitQuizReq,
    questionId: string
  ): Observable<ISubmitQuizResponse> {
    return this._HttpClient.post<ISubmitQuizResponse>(
      `quiz/submit/${questionId}`,
      quizData
    );
  }
}
