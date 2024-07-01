import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQuiz, IQuizRequest, IQuizResponse, IQuizResponseByID, IUpdateQuiz } from '../models/quizzes';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(private _HttpClient: HttpClient) { }

  getAllQuizes():Observable<IQuiz[]>{
    return this._HttpClient.get<IQuiz[]>('quiz');
  }
  upComingFive(): Observable<IQuiz[]> {
    return this._HttpClient.get<IQuiz[]>('quiz/incomming')
  }
  getUpcomingQuizes():Observable<IQuiz[]>{
    return this._HttpClient.get<IQuiz[]>('quiz/completed')
  }
  //Add new Quiz
  AddNewQuiz(newQuizData:IQuizRequest):Observable<IQuizResponse>{
    return this._HttpClient.post<IQuizResponse>('quiz' , newQuizData)
  }
  updateQuiz(id:string , updateQuizData:IUpdateQuiz):Observable<IQuizResponse>{
    return this._HttpClient.put<IQuizResponse>(`quiz/${id}` ,updateQuizData)
  }
  removeQuiz(id:string):Observable<any>{
    return this._HttpClient.delete(`quiz/${id}` )
  }
  getQuizByID(id:string):Observable<IQuizResponseByID>{
    return this._HttpClient.get<IQuizResponseByID>(`quiz/${id}` ) 
  }

  completedQuizzes(): Observable<IQuiz[]> {
    return this._HttpClient.get<IQuiz[]>('quiz/completed')
  }
}
