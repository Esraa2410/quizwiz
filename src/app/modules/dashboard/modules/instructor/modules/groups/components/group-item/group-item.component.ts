import { Component, Inject } from '@angular/core';
import { IGroupDetailsRes, IStudent } from '../../models/groups';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from '../../groups.component';
import { GroupsService } from '../../services/groups.service';



@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss']
})
export class GroupItemComponent {
  selectedStudents: string[]=[];
  studentsGroup: IStudent[] = [];
  studentID!:any[];
  groupDetails: IGroupDetailsRes = {
    _id: '',
    name: '',
    status: '',
    instructor: '',
    students: this.studentsGroup,
    max_students: 0
  }

  
  addEditGroupForm!: FormGroup ;
  //will be edited
 allStudentForAddNewGroup!:any ;
 allStudentForUpdatingGroup:any;
  constructor(private _GroupsService: GroupsService,private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<GroupItemComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
   
      this.veiwGroup(this.data.id);
    
 
    this.selectedStudents = this.studentsGroup.map(student => student.first_name);
    this.addEditGroupForm= this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      students: new FormControl([], [Validators.required]),
    })
   
      this.getAllStudentsWithoutGroup();
      this.getAllStudents();
    

  
  }

  veiwGroup(id: string) {
    this._GroupsService.getGroupById(id).subscribe({
      next: (res: IGroupDetailsRes) => {
         console.log(res);
        this.groupDetails = res;
        // for(let i=0 ;i<this.groupDetails.students.length ;i++){
        //    this.studentID.push(this.groupDetails.students[i]._id);
        // }
        this.studentID = this.groupDetails.students.map(item => item._id);

        console.log(this.studentID)
       

      }, error: (err: HttpErrorResponse) => {
         //console.log(err)
      }
    })
  }
  submit(addEditGroupForm:FormGroup) { 
    this.dialogRef.close(addEditGroupForm.value);
    console.log(addEditGroupForm.value)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

//will be edited 
  getAllStudentsWithoutGroup(){
    this._GroupsService.getAllStudentsForAddGroup().subscribe({
      next:(res)=>{
         console.log(res);
         this.allStudentForAddNewGroup=res
         console.log(this.allStudentForAddNewGroup)
      }
    });


   }
   getAllStudents(){
     this._GroupsService.getAllStudents().subscribe({
      next:(res)=>{
        console.log(res);
        this.allStudentForUpdatingGroup=res
        console.log(this.allStudentForUpdatingGroup)
     }
     })
   }
}
