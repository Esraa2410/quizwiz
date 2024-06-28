import { IAddStudToGroupReq, IAddStudToGroupRes, IStudentWithoutGroup,IDeleteStudentRes, Root ,IStudentWithoutGroupRes} from './../models/students';

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

  //delete student from group
  deleteStudGroup(data: IAddStudToGroupReq): Observable<IAddStudToGroupRes> {
    return this._HttpClient.delete<IAddStudToGroupRes>(`student/${data.student_id}/${data.group_id}`);
  }

  //update student group   =>not work
  updateStudGroup(data: IAddStudToGroupReq , data2:any): Observable<IAddStudToGroupRes> {
    return this._HttpClient.put<IAddStudToGroupRes>(`student/${data.student_id}/${data.group_id}` , data2);
  }

  studentsWithoutGroup(): Observable<Root> {
    return this._HttpClient.get<Root>('student/without-group')
  }

  //get student by id
  getStudent(id: string): Observable<IStudentWithoutGroupRes> {
    return this._HttpClient.get<IStudentWithoutGroupRes>(`student/${id}`)
  }

  //delte student by id
  deletStudent(id: string): Observable<IDeleteStudentRes> {
    return this._HttpClient.delete<IDeleteStudentRes>(`student/${id}`)
  }


}
