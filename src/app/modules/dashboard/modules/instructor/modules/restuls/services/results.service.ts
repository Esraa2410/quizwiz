
import { Root2 } from './../models/results';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private _HttpClient: HttpClient) { }

  allResults(): Observable<Root2[]> {
    return this._HttpClient.get<Root2[]>(`quiz/result`)

  }


}
