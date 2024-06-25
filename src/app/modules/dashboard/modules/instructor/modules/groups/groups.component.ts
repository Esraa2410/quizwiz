import { IGroupDetailsRes, IGroupsListRes, IGroupsListRes2, IStudent, IUpdateOrAddGroup } from './models/groups';
import { Component, OnInit } from '@angular/core';
import { GroupsService } from './services/groups.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { GroupItemComponent } from './components/group-item/group-item.component';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { IBreadCrumb } from 'src/app/modules/shared/models/shared';

export interface IDialogData {
  id: string
}


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  navigationList: IBreadCrumb[] = [
    { label: 'dashboard', url: '/dashboard' },
    { label: 'Groups' }
  ]
  btnText :string = 'Add Group' ;
  btnIcon :string ="fa fa-plus-circle"
  totalRecords: number = 10;
  IGroupsListRes2: IGroupsListRes2 = {
    _id: '',
    name: '',
    status: '',
    instructor: '',
    students: [],
    max_students: 0
  }
  groupList: IGroupsListRes2[] = [this.IGroupsListRes2];

  constructor(private _GroupsService: GroupsService, public dialog: MatDialog,
    private _HelperService:HelperService
  ) { }

  ngOnInit(): void {
    this.onAllGroups();


  }

  onAllGroups() {
    this._GroupsService.getAllGroups().subscribe({
      next: (res: IGroupsListRes) => {
        this.groupList = res;
       console.log(res)
      }, error: (err: HttpErrorResponse) => {
      }
    })
  }

  openVeiwDailog(enterAnimationDuration: string,
     exitAnimationDuration: string, id: string ,view:boolean  ): void {

    this.dialog.open(GroupItemComponent, {
      width: '550px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: id ,
        view:view,


      }
    });

  }


  //handle edit here
  openEditDailog(enterAnimationDuration: string,
    exitAnimationDuration: string, id: string ,edit:boolean): void {
      const dialogRef = this.dialog.open(GroupItemComponent, {
      width: '550px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: id,
        edit:edit
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The update  was closed');
      console.log(result);
      if (result) {
         this.editGroup(id , result)
        // this.toastr.success('your category deleted');
      }
    }
    )

  }
  editGroup(id:string, data:IUpdateOrAddGroup){
     this._GroupsService.editGroup(id,data).subscribe({
      next:(res)=>{
   console.log(res)
      },
      error:(error)=>{
        this._HelperService.error(error)
      },
      complete:()=>{
        this.onAllGroups();
        this._HelperService.success('Group Updated sucessfully')
      }

     })
  }
  //handle add
  openAddDailog(enterAnimationDuration: string, exitAnimationDuration: string,add:boolean): void {
   const dialogRef= this.dialog.open(GroupItemComponent, {
      width: '550px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
       add:add
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('recored added');
      console.log(result);
      if (result) {
        this.addnewGroup(result)

      }


    });

  }
  addnewGroup(addNewGroup:IUpdateOrAddGroup){
    this._GroupsService.AddNewGreoup(addNewGroup).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(error)=>{
        this._HelperService.error(error)
      },
      complete:()=>{
        this.onAllGroups();
        this._HelperService.success('Group added sucessfully')
      }

    })
  }
  //handle delete here
  openDeleteDailog(enterAnimationDuration: string, exitAnimationDuration: string,
    id: string ,remove:boolean): void {

   const dialogRef = this.dialog.open(GroupItemComponent, {
      width: '550px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: id,
        remove:remove
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The delete  was closed');
      console.log(result);
      if (result) {
        this.deleteGroup(result)

      }


    });
  }
  deleteGroup(id:string){
    this._GroupsService.deleteGroup(id).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(error)=>{
        //
      },
      complete:()=>{
        this.onAllGroups();
        this._HelperService.success('Group deleted sucessfully')
      }
    })
  }
  onPageSizeChanged(data: number) {
    // console.log(data)
  }

  onPageNumberChanged(data: number) {
    // console.log(data)
  }



}
