import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuestion } from '../models/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private _HttpClient: HttpClient) { }

  questions(): Observable<IQuestion[]> {
    return this._HttpClient.get<IQuestion[]>('question');
  }
}
