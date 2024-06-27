import { IGroupsListRes } from './../../../groups/models/groups';
import { HttpErrorResponse } from '@angular/common/http';
import { GroupsService } from './../../../groups/services/groups.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StudentsService } from '../../services/students.service';
import { Root } from '../../models/students';

@Component({
  selector: 'app-add-student-group',
  templateUrl: './add-student-group.component.html',
  styleUrls: ['./add-student-group.component.scss']
})
export class AddStudentGroupComponent implements OnInit {
  studentsList:Root=[];
  groupsList:IGroupsListRes=[];
  constructor(private _GroupsService:GroupsService,private _StudentsService:StudentsService ,
     public dialogRef: MatDialogRef<AddStudentGroupComponent>) { }

  ngOnInit(): void {
    this.getAllGroups();
    this.getStudentsWithoutGroup()
  }

  getAllGroups(){
    this._GroupsService.getAllGroups().subscribe({
      next:(res:IGroupsListRes)=>{
        console.log(res);
        this.groupsList=res;
      },error:(err:HttpErrorResponse)=>{
        console.log(err)
      }
    })
  }


  getStudentsWithoutGroup(){
    this._StudentsService.studentsWithoutGroup().subscribe({
      next:(res:Root)=>{
        console.log(res);
        this.studentsList=res;
      },error:(err:HttpErrorResponse)=>{
        console.log(err)
      }
    })
  }



















  onNoClick(): void {
    this.dialogRef.close();
  }

}
