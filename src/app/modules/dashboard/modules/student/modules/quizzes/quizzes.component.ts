import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IBreadCrumb, IButtonConfig } from 'src/app/modules/shared/models/shared';
import { HelperService } from 'src/app/modules/shared/services/helper.service';
import { StudentQuizService } from './service/studentQuiz.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent  implements OnInit{
 
  navigationList: IBreadCrumb[] = [
    { label: 'dashboard', url: '/dashboard' },
    { label: 'Quizes' },
  ];
 //will be edited
  upcomingQuizzes= [];
  completedQuizes= [];
  tableHeaders: string[] = [
    'title',
    'description',
    'participants',
    'difficulty',
  
  ];
  displayHeaders: { [key: string]: string } = {
    title: 'Title',
    description: 'Description',
    participants: 'Participants',
    difficulty:'Difficulty',
  
  };
 

  constructor(public dialog: MatDialog,
    private _Router:Router,
    private _HelperService: HelperService ,
  private _StudentQuizService:StudentQuizService){}
  ngOnInit(): void {
    this.upComingQuizes();
    this.getCompletedQuizes();
  }
  


    upComingQuizes(): void {
      this._StudentQuizService.getIcomingQuizes().subscribe((quizzes) => {
        this.upcomingQuizzes = quizzes;
      });
    }
    getCompletedQuizes():void{
      this._StudentQuizService.getCompletedQuizes().subscribe((res) => {
        this.completedQuizes = res;
      });
    }
 


}
