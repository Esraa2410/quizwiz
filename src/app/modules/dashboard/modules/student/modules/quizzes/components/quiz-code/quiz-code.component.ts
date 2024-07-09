import { IJoinQuizResponse } from './../../models/studentQuiz';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-quiz-code',
  templateUrl: './quiz-code.component.html',
  styleUrls: ['./quiz-code.component.scss'],
})
export class QuizCodeComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IJoinQuizResponse ,
  public dialogRef: MatDialogRef<QuizCodeComponent>,) {
    
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.onNoClick()
      
    }, 2000);
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
