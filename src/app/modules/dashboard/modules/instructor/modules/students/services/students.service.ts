import { IAddStudToGroupReq, IAddStudToGroupRes } from './../models/students';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private _HttpClient: HttpClient) { }

  addStudToGroup(data: IAddStudToGroupReq): Observable<IAddStudToGroupRes> {
    return this._HttpClient.get<IAddStudToGroupRes>(`student/${data.student_id}/${data.group_id}`);
  }
}
