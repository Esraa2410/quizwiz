import { IGroupDetailsRes, IStudent } from './../../models/groups';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDialogData } from '../../groups.component';
import { GroupsService } from '../../services/groups.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-veiw-group',
  templateUrl: './veiw-group.component.html',
  styleUrls: ['./veiw-group.component.scss']
})
export class VeiwGroupComponent implements OnInit {
  selectedStudents: string[]=[];
  students: IStudent[] = [];
  groupDetails: IGroupDetailsRes = {
    _id: '',
    name: '',
    status: '',
    instructor: '',
    students: this.students,
    max_students: 0
  }

  toppings = new FormControl('');
  constructor(private _GroupsService: GroupsService,
    public dialogRef: MatDialogRef<VeiwGroupComponent>
    , @Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  ngOnInit(): void {
    this.onVeiwGroup(this.data.id);
    this.selectedStudents = this.students.map(student => student.first_name);

  }

  onVeiwGroup(id: string) {
    this._GroupsService.getGroupById(id).subscribe({
      next: (res: IGroupDetailsRes) => {
        // console.log(res);
        this.groupDetails = res;
      }, error: (err: HttpErrorResponse) => {
         //console.log(err)
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
