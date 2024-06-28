import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { QuizItemComponent } from './components/quiz-item/quiz-item.component';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { IBreadCrumb, IButtonConfig } from 'src/app/modules/shared/models/shared';
import { IQuiz, IQuizRequest, IQuizResponse } from './models/quizzes';
import { QuizzesService } from './services/quizzes.service';
import { QuizCreatedComponent } from './components/quiz-created/quiz-created.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit{
 quizId:string='';
  navigationList: IBreadCrumb[] = [
    { label: 'dashboard', url: '/dashboard' },
    { label: 'Quizes' }
  ]
  btnText: string = 'Set up a new quiz';
  btnIcon: string = "fa-regular fa-clock";
  RouterLinkPath:string ='./view-Quiz'+this.quizId
  upcomingQuizzes: IQuiz[] = [];
  completedQuizes: IQuiz[] = [];
  tableHeaders: string[] = [
    'title',
    'description',
    'participants',
    'difficulty',
    'actions',
  ];
  displayHeaders: { [key: string]: string } = {
    title: 'Title',
    description: 'Description',
    participants: 'Participants',
    difficulty:'Difficulty',
    actions: 'Actions',
  };
  buttons: IButtonConfig[] = [
  
    {
      btnIcon: 'fa-solid fa-eye',
      action: (row) => this.viewFunction(row),
      class: 'yellow-color'
    }
   
  ];

  constructor(public dialog: MatDialog,
    private _Router:Router,
    private _HelperService: HelperService ,
  private _QuizzesService:QuizzesService){}
  ngOnInit(): void {
    this.upComingQuizes();
    this.getCompletedQuizes();
  }


    upComingQuizes(): void {
      this._QuizzesService.upComingFive().subscribe((quizzes) => {
        this.upcomingQuizzes = quizzes;
      });
    }
    getCompletedQuizes():void{
      this._QuizzesService.getUpcomingQuizes().subscribe((res) => {
        this.completedQuizes = res;
      });
    }

   //handle add
   openAddDailog(enterAnimationDuration: string, exitAnimationDuration: string, add: boolean): void {
    const dialogRef = this.dialog.open(QuizItemComponent, {
      width: '800px',
      height: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        add: add
      }
    });

    dialogRef.afterClosed().subscribe(result => {
       console.log('recored added');
      console.log(result);
      if (result) {
         this.addnewQuiz(result)

      }


    });

  }
  addnewQuiz(newQuizData:IQuizRequest) {
    this._QuizzesService.AddNewQuiz(newQuizData).subscribe({
      next: (res:IQuizResponse) => {
         console.log(res);
         this.openCreatedQuizDailog('1000ms','1000ms',res.data.code);

      },
      error: (error) => {
        this._HelperService.error(error)
      },
      complete: () => {
       this.upComingQuizes();
        this._HelperService.success('Quiz added sucessfully')
      }

     })
  }
  openCreatedQuizDailog(enterAnimationDuration: string, 
    exitAnimationDuration: string, code: string): void {
    const dialogRef = this.dialog.open(QuizCreatedComponent, {
      width: '400px',
      height: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        code: code
      }
    });

  

  }
 
  willBeViewed(event:string){
      this._Router.navigateByUrl(`dashboard/instructor/quizzes/view-Quiz/${event}`)
  }
  goToBankOfQuestions(){
    this._Router.navigateByUrl('/dashboard/instructor/questions')
  }
  viewFunction(row: any): void {
    console.log('View', row);
    this._Router.navigateByUrl(`/dashboard/instructor/quizzes/view-Quiz/${row._id}`)
  }

}
