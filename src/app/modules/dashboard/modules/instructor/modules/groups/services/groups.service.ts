import { IGroupDetailsRes ,IGroupsListRes, IStudentWithoutGroup, IUdateGroupRes, IUpdateOrAddGroup} from './../models/groups';
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
  deleteGroup(id:string):Observable<IGroupDetailsRes>{
    return this._HttpClient.delete<IGroupDetailsRes>(`group/${id}`)
  }
  
  editGroup(id:string, editData:IUpdateOrAddGroup):Observable<IUdateGroupRes>{
    return this._HttpClient.put<IUdateGroupRes>(`group/${id}`,editData)
  }
  AddNewGreoup(addNewGroup:IUpdateOrAddGroup):Observable<any>{
    return this._HttpClient.post<IUdateGroupRes>(`group`,addNewGroup)
  }
  //will be edited after making student service 
  getAllStudentsForAddGroup():Observable<IStudentWithoutGroup>{
   return this._HttpClient.get<IStudentWithoutGroup>('student/without-group')
  }
}
