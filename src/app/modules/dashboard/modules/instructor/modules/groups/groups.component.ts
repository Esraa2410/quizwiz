import { IGroupsListRes, IGroupsListRes2 } from './models/groups';
import { Component, OnInit } from '@angular/core';
import { GroupsService } from './services/groups.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { VeiwGroupComponent } from './components/veiw-group/veiw-group.component';

export interface IDialogData {
  id: string
}


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
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

  constructor(private _GroupsService: GroupsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.onAllGroups();

  }

  onAllGroups() {
    this._GroupsService.getAllGroups().subscribe({
      next: (res: IGroupsListRes) => {
        this.groupList = res;
      //  console.log(res)
      }, error: (err: HttpErrorResponse) => {
      }
    })
  }

  openVeiwDailog(enterAnimationDuration: string, exitAnimationDuration: string, id: string): void {
    this.dialog.open(VeiwGroupComponent, {
      width: '550px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: id
      }
    });
  }


  //handle edit here
  openEditDailog(id: string) {

  }

  //handle delete here
  openDeleteDailog(id: string) {

  }

  onPageSizeChanged(data: number) {
    // console.log(data)
  }

  onPageNumberChanged(data: number) {
    // console.log(data)
  }



}
