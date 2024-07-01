import { Component, OnInit } from '@angular/core';
import { IBreadCrumb, IButtonConfig } from 'src/app/modules/shared/models/shared';
import { StudentQuizService } from '../quizzes/service/studentQuiz.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent  implements OnInit{
  navigationList: IBreadCrumb[] = [
    { label: 'dashboard', url: '/dashboard' },
    { label: 'Resaults' },
  ];
 
  completedQuizReasults = [];
  tableHeaders: string[] = [
    'title',
    'groupName',
    'participants',
    'difficulty',
    'actions',
  ];
  displayHeaders: { [key: string]: string } = {
    title: 'Title',
    groupName: 'Group Name',
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
  constructor(private _StudentQuizService:StudentQuizService){

  }

  ngOnInit(): void {
    this.quizessResaults()
  }

  viewFunction(row: any): void {
    console.log('View', row);
    
  }
  quizessResaults(): void {
    this._StudentQuizService.getAllResaults().subscribe((resaults) => {
      this.completedQuizReasults = resaults;
    });
  }

}
