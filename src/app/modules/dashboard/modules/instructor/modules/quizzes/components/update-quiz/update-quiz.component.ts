import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IQuiz, IQuizResponse, IQuizResponseByID, Question } from '../../models/quizzes';
import { QuizzesService } from '../../services/quizzes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IGroupsListRes, IGroupsListRes2 } from '../../../groups/models/groups';
import { GroupsService } from '../../../groups/services/groups.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent  implements OnInit{
  editquizForm!: FormGroup ;
  quizData!:IQuizResponseByID;
  /**/
  title!: string
  description!: string
  schadule!: string
  duration!: number
  score_per_question!: number;
  group!:string;

 
  groupList: IGroupsListRes2[] = [];
  constructor( private formBuilder: FormBuilder,
    private _GroupService: GroupsService,
    private _QuizzesService:QuizzesService,
    public dialogRef: MatDialogRef<UpdateQuizComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any){

    }
  ngOnInit(){
    this.editquizForm = this.formBuilder.group({
     title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      group : new FormControl('', [Validators.required]),
      schadule: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      score_per_question: new FormControl('', [Validators.required]),
   
    });
    if(this.data.id){
      console.log(this.data.id)
      this.getQuizById(this.data.id);
    }
 
    this.getAllGroups();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(editquizForm:FormGroup) { 
    this.dialogRef.close(editquizForm.value);
    console.log(editquizForm.value)
  }
  getQuizById(id:string){
    this._QuizzesService.getQuizByID(id).subscribe({
      next:(res:IQuizResponseByID)=>{
        //console.log(res);
        this.quizData= res;
        console.log(this.quizData)
        this.title= this.quizData.title;
        this.description= this.quizData.description;
        this.schadule= this.quizData.schadule;
        this.duration = this.quizData.duration
        this.score_per_question= this.quizData.score_per_question
        this.group= this.quizData.group
      },
      error:()=>{

      },complete:()=>{

      },
    })

  }
  getAllGroups() {

    this._GroupService.getAllGroups().subscribe({
      next: (res: IGroupsListRes) => {
        this.groupList = res;
     

        // console.log(res)
      }, error: (err: HttpErrorResponse) => {
      }
    })

  }

}
