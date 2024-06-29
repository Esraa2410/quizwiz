import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IQuiz } from '../../models/quizzes';
import { QuizzesService } from '../../services/quizzes.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent  implements OnInit{
  editquizForm!: FormGroup ;
  quizData!:IQuiz;
  quizTitle:string=''
  constructor( private formBuilder: FormBuilder,
    private _QuizzesService:QuizzesService,
    public dialogRef: MatDialogRef<UpdateQuizComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any){

    }
  ngOnInit(): void {
    this.editquizForm= this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
     
    });
    if(this.data.id){
      console.log(this.data.id)
    }
    this.getQuizById(this.data.id)
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
      next:(res:IQuiz)=>{
        console.log(res);
        this.quizData= res;
        this.quizTitle=res.title
      },
      error:()=>{

      },complete:()=>{

      },
    })

  }

}
