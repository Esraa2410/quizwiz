import { AddStudentGroupComponent } from './components/add-student-group/add-student-group.component';
import { IBreadCrumb } from './../../../../../shared/models/shared';
import { Component, OnInit } from '@angular/core';
import { StudentsService } from './services/students.service';
import { IAddStudToGroupReq, IAddStudToGroupRes } from './models/students';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  navigationList: IBreadCrumb[] = [
    { label: 'dashboard', url: '/dashboard' },
    { label: 'Students' }
  ]
  btnText: string = 'Add Student';
  btnIcon: string = "fa fa-plus-circle";

  data: IAddStudToGroupReq = {
    group_id: '',
    student_id: ''
  }

  constructor(public dialog: MatDialog, private _StudentsService: StudentsService, private _HelperService: HelperService) { }
  ngOnInit(): void {

  }

  //add student to group
  addStudToGroup(data: IAddStudToGroupReq) {
    this._StudentsService.addStudToGroup(data).subscribe({
      next: (res: IAddStudToGroupRes) => {
        this._HelperService.success(res.message);
      }, error: (err: HttpErrorResponse) => {
        this._HelperService.error(err)
      }, complete: () => {
        //call getallstudents function
      }
    })
  }


  openAddDailog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddStudentGroupComponent, {
      width: '550px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


}
