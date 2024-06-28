import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-quiz-created',
  templateUrl: './quiz-created.component.html',
  styleUrls: ['./quiz-created.component.scss']
})
export class QuizCreatedComponent {
constructor( public dialogRef: MatDialogRef<QuizCreatedComponent>
  , @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
