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
  studentData: IStudent[] = [];
  paginatedStudentData: IStudent[] = [];
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;

  private _StudentsService = inject(StudentsService);
  private _HelperService = inject(HelperService);

  ngOnInit(): void {
    this.onGetAllStudents();
  }

  onGetAllStudents(): void {
    this._StudentsService.getAllStudents().subscribe({
      next: (res: IStudent[]) => {
        this.studentData = res;
        this.totalRecords = res.length;
        this.updatePaginatedData();
      },
      error: (error: HttpErrorResponse) => this._HelperService.error(error)
    });
  }

  updatePaginatedData(): void {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedStudentData = this.studentData.slice(start, end);
  }

  onPageSizeChange(size: number): void {
    this.rows = size;
    this.first = 0;
    this.updatePaginatedData();
  }

  onPageNumberChange(page: number): void {
    this.first = (page - 1) * this.rows;
    this.updatePaginatedData();
  }
}
