import { Component, inject } from '@angular/core';
import { IStudent, IStudentWithoutGroup } from '../../models/students';
import { StudentsService } from '../../services/students.service';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { VeiwDeleteStudentComponent } from '../veiw-delete-student/veiw-delete-student.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students-without-group',
  templateUrl: './students-without-group.component.html',
  styleUrls: ['./students-without-group.component.scss']
})
export class StudentsWithoutGroupComponent {
  studentsWithoutGroup!: IStudentWithoutGroup[];
  paginatedStudentData: IStudentWithoutGroup[] = [];
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;

  private _StudentsService = inject(StudentsService);
  private _HelperService = inject(HelperService);
  public dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getStudentsWithoutGroup();
  }

  getStudentsWithoutGroup(): void {
    this._StudentsService.getStudentsWithoutGroup().subscribe({
      next: (res: IStudentWithoutGroup[]) => {
        this.studentsWithoutGroup = res;
        this.totalRecords = res.length;
        this.updatePaginatedData();
      },
      error: (error: HttpErrorResponse) => this._HelperService.error(error),
      // complete: () => this._HelperService.success('Students Without group retrieved')
    });
  }

  updatePaginatedData(): void {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedStudentData = this.studentsWithoutGroup.slice(start, end);
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

  willBeViewed(event: string): any {
    let btnText = 'veiw'
    const dialogRef = this.dialog.open(VeiwDeleteStudentComponent, {
      width: '570px',
      height: '350px',
      data: {
        id: event,
        btnText: btnText
      }
    });

  }


  willBeDelete(event: string): any {
    let btnText = 'delete'
    const dialogRef = this.dialog.open(VeiwDeleteStudentComponent, {
      width: '570px',
      height: '350px',
      data: {
        id: event,
        btnText: btnText
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getStudentsWithoutGroup();
    })
  }
}
