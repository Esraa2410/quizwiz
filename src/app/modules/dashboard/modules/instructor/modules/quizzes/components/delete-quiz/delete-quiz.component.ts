import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-quiz',
  templateUrl: './delete-quiz.component.html',
  styleUrls: ['./delete-quiz.component.scss']
})
export class DeleteQuizComponent {
  constructor( public dialogRef: MatDialogRef<DeleteQuizComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any){

    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
