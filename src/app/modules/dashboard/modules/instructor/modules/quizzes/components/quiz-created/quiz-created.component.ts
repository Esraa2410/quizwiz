import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HelperService } from 'src/app/modules/shared/services/helper.service';

@Component({
  selector: 'app-quiz-created',
  templateUrl: './quiz-created.component.html',
  styleUrls: ['./quiz-created.component.scss']
})
export class QuizCreatedComponent {
constructor( public dialogRef: MatDialogRef<QuizCreatedComponent>
  , @Inject(MAT_DIALOG_DATA) public data: any ,private _HelperService:HelperService
) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  copyText(){
   this._HelperService.success('Code has been copied ')
  }
}

