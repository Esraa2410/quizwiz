import { IGroupDetailsRes ,IGroupsListRes} from './../models/groups';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor(private _HttpClient: HttpClient) { }

  getAllGroups(): Observable<IGroupsListRes> {
    return this._HttpClient.get<IGroupsListRes>(`group`)
  }

  getGroupById(id:string):Observable<IGroupDetailsRes>{
    return this._HttpClient.get<IGroupDetailsRes>(`group/${id}`)
  }
}
