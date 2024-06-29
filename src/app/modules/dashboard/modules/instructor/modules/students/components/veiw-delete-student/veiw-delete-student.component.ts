import { HelperService } from 'src/app/modules/shared/services/helper.service';
import {  IStudentWithoutGroupRes, IDeleteStudentRes, IStudent } from '../../models/students';
import { Component, Inject, OnInit } from '@angular/core';
import { GroupsService } from '../../../groups/services/groups.service';
import { StudentsService } from '../../services/students.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-veiw-delete-student',
  templateUrl: './veiw-delete-student.component.html',
  styleUrls: ['./veiw-delete-student.component.scss']
})
export class VeiwDeleteStudentComponent implements OnInit {
  studentDetails: IStudentWithoutGroupRes = {
    _id: '',
    email: '',
    first_name: '',
    last_name: '',
    role: '',
    status: ''
  };

  constructor(private _HelperService: HelperService, private _GroupsService: GroupsService, private _StudentsService: StudentsService,
    public dialogRef: MatDialogRef<VeiwDeleteStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    



  ngOnInit(): void {
    this.veiwStudent(this.data.id);
  }



  deleteStudent(id: string) {
    this._StudentsService.deletStudent(id).subscribe({
      next: (res: IDeleteStudentRes) => {
        this._HelperService.success(res.message);
      }, error: (err: HttpErrorResponse) => {
       // this._HelperService.error(err.error.message);
      }, complete: () => {
        this.onNoClick();
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
