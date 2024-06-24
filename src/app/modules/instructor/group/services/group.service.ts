import { IGroupsListRes, IGroupsListRes2 } from './../models/group';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private _HttpClient: HttpClient) { }

  getAllGroups(): Observable<IGroupsListRes> {
    return this._HttpClient.get<IGroupsListRes>(`group`)
  }

  getGroupById(id:string):Observable<IGroupsListRes2>{
    return this._HttpClient.get<IGroupsListRes2>(`group/${id}`)
  }
}
