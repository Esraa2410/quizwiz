import { IAddStudToGroupReq, IAddStudToGroupRes, IStudentWithoutGroup, Root } from './../models/students';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IStudent } from '../models/students';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private _HttpClient: HttpClient) { }

  getAllStudents(): Observable<IStudent[]> {
    return this._HttpClient.get<IStudent[]>('student')
  }

  getStudentsWithoutGroup(): Observable<IStudentWithoutGroup[]> {
    return this._HttpClient.get<IStudentWithoutGroup[]>('student/without-group')
  }

  addStudToGroup(data: IAddStudToGroupReq): Observable<IAddStudToGroupRes> {
    return this._HttpClient.get<IAddStudToGroupRes>(`student/${data.student_id}/${data.group_id}`);
  }

  studentsWithoutGroup(): Observable<Root> {
    return this._HttpClient.get<Root>('student/without-group')
  }
}
