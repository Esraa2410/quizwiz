import { IStudentWithoutGroupRes } from './../../models/students';
import { Component, OnInit, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { IStudent } from '../../models/students';
import { StudentsService } from '../../services/students.service';
import { MatDialog } from '@angular/material/dialog';
import { VeiwDeleteStudentComponent } from '../veiw-delete-student/veiw-delete-student.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  studentData!: IStudent[];
  studentDetails:IStudentWithoutGroupRes={
    _id:'',
    email:'',
    first_name:'',
    last_name:'',
    role:'',
    status:''
  };
  private _StudentsService = inject(StudentsService);
  private _HelperService = inject(HelperService);
  public dialog=inject(MatDialog);

  ngOnInit(): void {
    this.onGetAllStudents();
  }

  onGetAllStudents(): void {
    this._StudentsService.getAllStudents().subscribe({
      next: (res: IStudent[]) => this.studentData = res,
      error: (error: HttpErrorResponse) => this._HelperService.error(error)
    })
  }


  openDailog(enterAnimationDuration: string, exitAnimationDuration: string ,id:string ,btnText:string): void {
    const dialogRef =    this.dialog.open(VeiwDeleteStudentComponent, {
      width: '570px',
      height: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id:id,
        btnText:btnText
      }
    });

    if(btnText=='delete'){
    dialogRef.afterClosed().subscribe(() => {
      this.onGetAllStudents();
    });
  }
  }


}




