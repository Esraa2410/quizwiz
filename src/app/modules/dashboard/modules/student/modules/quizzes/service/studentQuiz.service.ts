import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudentQuiz, IJoinQuizResponse, ISubmitQuizReq, ISubmitQuizResponse, IJoinQuizReq } from '../models/studentQuiz';

@Injectable({
  providedIn: 'root',
})
export class StudentQuizService {
  constructor(private _HttpClient: HttpClient) { }

  quizWithoutAnswer(id: string): Observable<IStudentQuiz> {
    return this._HttpClient.get<IStudentQuiz>(`quiz/without-answers/${id}`);
  }

  joinQuiz(quizData: IJoinQuizReq): Observable<IJoinQuizResponse> {
    return this._HttpClient.post<IJoinQuizResponse>('quiz/join', quizData);
  }

  submitQuiz(quizData: ISubmitQuizReq, questionId: string): Observable<ISubmitQuizResponse> {
    return this._HttpClient.post<ISubmitQuizResponse>(`quiz/submit/${questionId}`, quizData);
  }

 
  getIcomingQuizes(): Observable<any> {
    return this._HttpClient.get('quiz/incomming');
  }

  getCompletedQuizes(): Observable<any> {
    return this._HttpClient.get('quiz/completed')
  }
  
  getAllResaults(): Observable<any> {
    return this._HttpClient.get('quiz/result')
  }
}
