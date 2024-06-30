import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuestion, IQuestionBase } from '../models/questions';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private _HttpClient: HttpClient) {}

  questions(): Observable<IQuestion[]> {
    return this._HttpClient.get<IQuestion[]>('question');
  }

  addQuestion(questionData: IQuestionBase): Observable<IQuestion> {
    return this._HttpClient.post<IQuestion>('question', questionData);
  }

  veiwQuestion(id: string): Observable<IQuestion> {
    return this._HttpClient.get<IQuestion>(`question/${id}`);
  }

  updateQuestion(id: string, questionData: IQuestionBase): Observable<IQuestion> {
    return this._HttpClient.put<IQuestion>(`question/${id}`, questionData);
  }

  deleteQuestion(id: string): Observable<IQuestion> {
    return this._HttpClient.delete<IQuestion>(`question/${id}`);
  }
}
