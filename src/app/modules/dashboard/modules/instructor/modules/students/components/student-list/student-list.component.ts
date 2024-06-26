import { Component, inject, OnInit } from '@angular/core';
import { IStudent } from '../../models/students';
import { StudentsService } from '../../services/students.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from 'src/app/modules/shared/services/helper.service';

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

  getStudentName = (student: IStudent): string => `${student.first_name} ${student.last_name}`;
  getStudentRank = (student: IStudent, index?: number): string => `Class rank: ${index !== undefined ? index + 1 : ''}`;
  getStudentDetails = (student: IStudent): string => `Group ${student.group?.name}`;
  getNumOfStudents = (student: IStudent): string => student._id || '';

  onGetAllStudents(): void {
    this._StudentsService.getAllStudent().subscribe({
      next: (res: IStudent[]) => this.studentData = res,
      error: (error: HttpErrorResponse) => this._HelperService.error(error),
      complete: () => this._HelperService.success('Students List Has Been Retrieved')
    });
  }
}
