import { IGroupsListRes2 } from './../../models/groups';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDialogData } from '../../groups.component';
import { GroupsService } from '../../services/groups.service';
import { HttpErrorResponse } from '@angular/common/http';


interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-veiw-group',
  templateUrl: './veiw-group.component.html',
  styleUrls: ['./veiw-group.component.scss']
})
export class VeiwGroupComponent implements OnInit {
  cities!: City[];
  selectedCities!: City[];

  groupDetails: IGroupsListRes2 = {
    _id: '',
    name: '',
    status: '',
    instructor: '',
    students: [],
    max_students: 0
  }

  constructor(private _GroupsService: GroupsService,
    public dialogRef: MatDialogRef<VeiwGroupComponent>
    , @Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  ngOnInit(): void {
    this.onVeiwGroup(this.data.id);
  //   this.cities = [
  //     {name: 'New York', code: 'NY'},
  //     {name: 'Rome', code: 'RM'},
  //     {name: 'London', code: 'LDN'},
  //     {name: 'Istanbul', code: 'IST'},
  //     {name: 'Paris', code: 'PRS'}
  // ];
  }



  onVeiwGroup(id: string) {
    this._GroupsService.getGroupById(id).subscribe({
      next: (res: IGroupsListRes2) => {
        console.log(res);
        this.groupDetails = res;
      }, error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
