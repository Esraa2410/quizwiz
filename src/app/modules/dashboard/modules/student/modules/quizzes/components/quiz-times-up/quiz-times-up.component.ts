import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-times-up',
  templateUrl: './quiz-times-up.component.html',
  styleUrls: ['./quiz-times-up.component.scss']
})
export class QuizTimesUpComponent implements OnInit {
  constructor(
   
    public dialogRef: MatDialogRef<QuizTimesUpComponent>,
    public _Router:Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.onNoClick()
      
    }, 2000);
  }
  onNoClick(): void {
    this.dialogRef.close();
    this._Router.navigateByUrl('/dashboard/student/quizzes/quizzes-home')
  }
 
}
