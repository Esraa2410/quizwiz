import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuizRequest } from '../models/quizzes';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(private _HttpClient: HttpClient) { }

  //Add new Quiz
  AddNewQuiz(newQuizData:IQuizRequest):Observable<any>{
    return this._HttpClient.post('quiz' , newQuizData)
  }
  updateQuiz(id:string , updateQuizData:any):Observable<any>{
    return this._HttpClient.put(`quiz/${id}` , updateQuizData)
  }
  removeQuiz(id:string):Observable<any>{
    return this._HttpClient.delete(`quiz/${id}` )
  }

}
