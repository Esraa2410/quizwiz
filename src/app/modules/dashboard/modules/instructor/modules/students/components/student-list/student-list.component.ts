import { Component, OnInit, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { IStudent } from '../../models/students';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  studentData!: IStudent[];
  private _StudentsService = inject(StudentsService);
  private _HelperService = inject(HelperService);

  ngOnInit(): void {
    this.onGetAllStudents();
  }

  onGetAllStudents(): void {
    this._StudentsService.getAllStudents().subscribe({
      next: (res: IStudent[]) => this.studentData = res,
      error: (error: HttpErrorResponse) => this._HelperService.error(error),
      complete: () => this._HelperService.success('Students List Has Been Retrieved')
    })
  }
}
