import { IGroupsListRes } from './../../../groups/models/groups';
import { IDeleteStudentRes, IStudentWithoutGroupRes, Root, IAddStudToGroupRes } from './../../models/students';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { GroupsService } from '../../../groups/services/groups.service';
import { StudentsService } from '../../services/students.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-veiw-delete-student-group',
  templateUrl: './veiw-delete-student-group.component.html',
  styleUrls: ['./veiw-delete-student-group.component.scss']
})
export class VeiwDeleteStudentGroupComponent implements OnInit {
  groupsList: IGroupsListRes = [];
  stdId: string = '';
  studentDetails: IStudentWithoutGroupRes = {
    _id: '',
    email: '',
    first_name: '',
    last_name: '',
    role: '',
    status: ''
  };


  constructor(private _ActivatedRoute: ActivatedRoute, private _HelperService: HelperService, private _GroupsService: GroupsService, private _StudentsService: StudentsService,
    public dialogRef: MatDialogRef<VeiwDeleteStudentGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.veiwStudent(this.data.stdId);
    this.getAllGroups();
    this.stdId = this.data.stdId;

  }

  deletStudentFromGroup(stId: string, groupId: string) {
    this._StudentsService.deleteStudGroup(stId, groupId).subscribe({
      next: (res: IDeleteStudentRes) => {
        this._HelperService.success(res.message)
      },
      error: (err: HttpErrorResponse) => {
      }, complete: () => {
        this.onNoClick()
      }
    })

  }

  updateForm: FormGroup = new FormGroup({
    groupId: new FormControl('')
  })

  updateStudentGroup(stdId: string, updateForm: FormGroup) {
    this._StudentsService.updateStudGroup(stdId, updateForm.get('groupId')?.value).subscribe({
      next: (res: IAddStudToGroupRes) => {
        this._HelperService.success(res.message);
      },
      error: (err: HttpErrorResponse) => {
        this._HelperService.error(err.error.message)
      }, complete: () => {
        this.onNoClick();
      }
    })

  }

  getAllGroups() {
    this._GroupsService.getAllGroups().subscribe({
      next: (res: IGroupsListRes) => {
        this.groupsList = res;
      }, error: (err: HttpErrorResponse) => {
      }
    })
  }





  veiwStudent(id: string) {
    this._StudentsService.getStudent(id).subscribe({
      next: (res: IStudentWithoutGroupRes) => {
        this.studentDetails = res;
      }, error: (err: HttpErrorResponse) => {
        this._HelperService.error(err.error.message);
      }
    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
