import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StudentQuizService } from '../../service/studentQuiz.service';
import { IJoinQuizResponse } from '../../models/studentQuiz';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { HttpErrorResponse } from '@angular/common/http';
import { QuizCodeComponent } from '../quiz-code/quiz-code.component';

@Component({
  selector: 'app-quiz-pop',
  templateUrl: './quiz-pop.component.html',
  styleUrls: ['./quiz-pop.component.scss'],
})
export class QuizPopComponent {
  joinForm: FormGroup = new FormGroup({
    code: new FormControl(null),
  });

  constructor(
    public dialogRef: MatDialogRef<QuizPopComponent>,
    private _StudentQuizService: StudentQuizService,
    private _HelperSerivce: HelperService,
    public dialog: MatDialog,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(joinForm: FormGroup): void {
    this._StudentQuizService.joinQuiz(joinForm.value).subscribe({
      next: (res: IJoinQuizResponse) => { },
      error: (error: HttpErrorResponse) => this._HelperSerivce.error(error),
      complete: () => {
        this.onNoClick();
        this.openQuizCode('1000ms', '1000ms');
      }
    })
  }

  openQuizCode(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    const dialogRef = this.dialog.open(QuizCodeComponent, {
      width: '400px',
      height: '206px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result: any) => {  });
  }
}
