import { IAddStudToGroupReq, IAddStudToGroupRes } from './../../models/students';
import { IGroupsListRes } from './../../../groups/models/groups';
import { HttpErrorResponse } from '@angular/common/http';
import { GroupsService } from './../../../groups/services/groups.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StudentsService } from '../../services/students.service';
import { Root } from '../../models/students';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/modules/shared/services/helper.service';

@Component({
  selector: 'app-add-student-group',
  templateUrl: './add-student-group.component.html',
  styleUrls: ['./add-student-group.component.scss']
})
export class AddStudentGroupComponent implements OnInit {
  studentsList: Root = [];
  groupsList: IGroupsListRes = [];
  constructor(private _HelperService: HelperService, private _GroupsService: GroupsService, private _StudentsService: StudentsService,
    public dialogRef: MatDialogRef<AddStudentGroupComponent>) { }

  ngOnInit(): void {
    this.getAllGroups();
    this.getStudentsWithoutGroup()
  }

  addStudToGroupForm: FormGroup = new FormGroup({
    student_id: new FormControl(null, [Validators.required]),
    group_id: new FormControl(null, [Validators.required])
  })

  addStudToGroup(data: FormGroup) {
    this._StudentsService.addStudToGroup(data.value).subscribe({
      next: (res: IAddStudToGroupRes) => {
        this._HelperService.success(res.message);
      }, error: (err: HttpErrorResponse) => {
        this._HelperService.error(err);
      }, complete: () => {
        this.onNoClick();
        const groupId = data.get('group_id')?.value;
        this.dialogRef.close(groupId);

      }
    })
  }


  onGetSpecificGroup(id: string): void {
    this._GroupsService.getGroupById(id).subscribe({
      next: (res: any) => {
      }
    });
  }

  getAllGroups() {
    this._GroupsService.getAllGroups().subscribe({
      next: (res: IGroupsListRes) => {
        this.groupsList = res;
      }, error: (err: HttpErrorResponse) => {
      }
    })
  }

  getStudentsWithoutGroup() {
    this._StudentsService.studentsWithoutGroup().subscribe({
      next: (res: Root) => {
        this.studentsList = res;
      }, error: (err: HttpErrorResponse) => {
      }
    })
  }









  onNoClick(): void {
    this.dialogRef.close();
  }

}
