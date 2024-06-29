import { Component, inject } from '@angular/core';
import { GroupsService } from '../../../groups/services/groups.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IGroupDetailsRes, IStudent } from '../../../groups/models/groups';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { StudentsService } from '../../services/students.service';
import { VeiwDeleteStudentComponent } from '../veiw-delete-student/veiw-delete-student.component';
import { MatDialog } from '@angular/material/dialog';
import { VeiwDeleteStudentGroupComponent } from '../veiw-delete-student-group/veiw-delete-student-group.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {
  group_id:string='';
  private _GroupsService = inject(GroupsService);
  private _ActivatedRoute = inject(ActivatedRoute);
  private _HelperService = inject(HelperService);
  private _StudentsService = inject(StudentsService);
  public dialog = inject(MatDialog);
  studentsDetails!: IStudent[];
  paginatedStudentData!: IStudent[];
  totalRecords: number = 0;
  rows: number = 10;
  first: number = 0;
  studentDetails:any;

  ngOnInit(): void {
    this.onCheckRoute();
  }

  onGetSpecificGroup(id: string): void {
    this._GroupsService.getGroupById(id).subscribe({
      next: (res: IGroupDetailsRes) => {
        this.studentsDetails = res.students;
        this.totalRecords = this.studentsDetails.length;
        this.updatePaginatedData();
      },
      error: (error: HttpErrorResponse) => this._HelperService.error(error),
    });
  }

  onCheckRoute(): void {
    this._ActivatedRoute.params.subscribe((params: Params) => {
      this.onGetSpecificGroup(params['id']);
      this.group_id=params['id'];
    });
  }

  updatePaginatedData(): void {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedStudentData = this.studentsDetails.slice(start, end);
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
    console.log(event)
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
      this.onCheckRoute();
    })
  }

  openUpdateDailog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    stdId:string,
    btnText:string
  ): void {
    this.dialog.open(VeiwDeleteStudentGroupComponent, {
      width: '550px',
      height: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        stdId:stdId,
        groupId:this.group_id,
        btnText:btnText

      }
    });
  }

  
  willBeDeleteFromGroup(event: string): any {
    let btnText = 'delete'
    const dialogRef = this.dialog.open(VeiwDeleteStudentGroupComponent, {
      width: '570px',
      height: '350px',
      data: {
        stdId: event,
        groupId:this.group_id,
        btnText: btnText
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.onCheckRoute();
    })
  }

  willBeUpdateGroup(event: string): any {
    let btnText = 'update'
    const dialogRef = this.dialog.open(VeiwDeleteStudentGroupComponent, {
      width: '570px',
      height: '350px',
      data: {
        stdId: event,
        groupId:this.group_id,
        btnText: btnText
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.onCheckRoute();
    })
  }



}
