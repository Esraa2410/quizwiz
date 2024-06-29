import { AddStudentGroupComponent } from './components/add-student-group/add-student-group.component';
import { IBreadCrumb } from './../../../../../shared/models/shared';
import { Component, OnInit } from '@angular/core';
import { StudentsService } from './services/students.service';
import { IAddStudToGroupReq, IAddStudToGroupRes } from './models/students';
import { HttpErrorResponse } from '@angular/common/http';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MenuItem } from 'primeng/api';
import { GroupsService } from '../groups/services/groups.service';
import { IGroupsListRes, IGroupsListRes2 } from '../groups/models/groups';
import { ActivatedRoute, Router, Params } from '@angular/router';

interface IStudentsRouting {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  group_id:string='';
  allGroups: IGroupsListRes2[] = [];
  navigationList: IBreadCrumb[] = [
    { label: 'dashboard', url: '/dashboard' },
    { label: 'Students' },
  ];
  btnText: string = 'Add Student';
  btnIcon: string = 'fa fa-plus-circle';
  studentsRouting: IStudentsRouting[] = [
    { label: 'All Students', url: '/dashboard/instructor/students' },
    {
      label: 'Students without group',
      url: '/dashboard/instructor/students/students-without-group',
    },
    { label: 'Groups' },
  ];

  items: MenuItem[] = [];

  data: IAddStudToGroupReq = {
    group_id: '',
    student_id: '',
  };

  constructor(
    private _ActivatedRoute:ActivatedRoute,
    public dialog: MatDialog,
    private _StudentsService: StudentsService,
    private _HelperService: HelperService,
    private _GroupsService: GroupsService,
    private _Router: Router
  ) {}
  
  ngOnInit(): void {
    this.getAllGroups();
  }

  getAllGroups(): void {
    this._GroupsService.onGetAllGroups().subscribe({
      next: (res: IGroupsListRes2[]) => {
        this.allGroups = res;
        this.groupsItem();
      }
    });
  }

  groupsItem(): void {
    this.items = this.allGroups.map(group => ({
      label: group.name,
      icon: 'pi pi-users',
      command: () => {
        this._Router.navigate([`/dashboard/instructor/students/groups/${group._id}`])
      }
    }));
  }

  // add student to group
  // addStudToGroup(data: IAddStudToGroupReq) {
  //   this._StudentsService.addStudToGroup(data).subscribe({
  //     next: (res: IAddStudToGroupRes) => {
  //       this._HelperService.success(res.message);
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       this._HelperService.error(err);
  //     },
  //     complete: () => {
  //       // call getallstudents function

  //     },
  //   });
  // }

  openAddDailog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
   const dialogRef= this.dialog.open(AddStudentGroupComponent, {
      width: '550px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result:any) => {
     if (result) {
      this.onGetSpecificGroup(result);
    }
    })


  }



  onGetSpecificGroup(id: string): void {
    this._GroupsService.getGroupById(id).subscribe({
      next: (res: any) => {
      },
      error: (error: HttpErrorResponse) => this._HelperService.error(error),
    });
  }

}
