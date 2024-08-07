import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBreadCrumb } from 'src/app/modules/shared/models/shared';
import { QuizzesService } from '../../services/quizzes.service';
import { IQuiz, IQuizResponse, IQuizResponseByID, IUpdateQuiz } from '../../models/quizzes';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { DeleteQuizComponent } from '../delete-quiz/delete-quiz.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateQuizComponent } from '../update-quiz/update-quiz.component';


@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss']
})
export class ViewQuizComponent implements OnInit {

  viewID: string = ''
  navigationList: IBreadCrumb[] = [
    { label: 'Quizes', url: '/dashboard/instructor/quizzes' },
    { label: 'View' }
  ]

  btnText: string = 'Dashboard';
  btnIcon: string = "";
  quizData!: IQuizResponseByID;
  constructor(private _Router: Router,
    private _QuizzesService: QuizzesService,
    private _ActivatedRoute: ActivatedRoute,
    private _HelperService: HelperService,
    public dialog: MatDialog,) {
  }
  
  ngOnInit(): void {
    this.viewID = this._ActivatedRoute.snapshot.params['id'];
    this.getQuizById();
  }

  GoToDashBoard() {
    this._Router.navigateByUrl('/dashboard')
  }

  getQuizById() {
    this._QuizzesService.getQuizByID(this.viewID).subscribe({
      next: (res: IQuizResponseByID) => {
        this.quizData = res;
      },
      error: () => {

      }, complete: () => {

      },
    })

  }


  //handle delete here
  openDeleteDailog(enterAnimationDuration: string,
    exitAnimationDuration: string,
    id: string,
    title: string,
    createdAt: string): void {

    const dialogRef = this.dialog.open(DeleteQuizComponent, {
      width: '400px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: id,
        title: title,
        createdAt: createdAt

      }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteQuiz(result)

      }


    });
  }
  deleteQuiz(id: string) {
    this._QuizzesService.removeQuiz(id).subscribe({
      next: (res) => {
      },
      error: (error) => {

      },
      complete: () => {

        this._HelperService.success('Quiz deleted sucessfully');
        this._Router.navigateByUrl('/dashboard/instructor/quizzes')
      }
    })
  }
  //handle update
  //handle delete here
  openUpdateDailog(enterAnimationDuration: string,
    exitAnimationDuration: string,
    id: string, title: string, description: string
  ): void {

    const dialogRef = this.dialog.open(UpdateQuizComponent, {
      width: '850px',
      height: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: id,
        title: title,
        description: description


      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.updateQuiz(id, result)

      }


    });
  }
  updateQuiz(id: string, updateData: IUpdateQuiz) {
    this._QuizzesService.updateQuiz(id, updateData).subscribe({
      next: (res) => {
      },
      error: (error) => {

      },
      complete: () => {

        this._HelperService.success('Quiz updated sucessfully');
        this._Router.navigateByUrl('/dashboard/instructor/quizzes')
      }
    })
  }

}
