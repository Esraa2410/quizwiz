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


  constructor(private _ActivatedRoute: ActivatedRoute, private _HelperService: HelperService, private _GroupsService: GroupsService, private _StudentsService: StudentsService,
    public dialogRef: MatDialogRef<VeiwDeleteStudentGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {  }

  deletStudentFromGroup(stId: string, groupId: string) {
    this._StudentsService.deleteStudGroup(stId, groupId).subscribe({
      next: (res: IDeleteStudentRes) => {
        console.log(res);
        this._HelperService.success(res.message)

      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
      },complete:()=>{
        this.onNoClick()
      }
    })

  }








  onNoClick(): void {
    this.dialogRef.close();
  }
}
