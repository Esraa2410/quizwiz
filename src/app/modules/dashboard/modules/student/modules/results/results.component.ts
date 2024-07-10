import { Component, OnInit } from '@angular/core';
import { IBreadCrumb, IButtonConfig } from 'src/app/modules/shared/models/shared';
import { ResultsService } from './services/results.service';
import { IResultsRes } from './models/results';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent  implements OnInit{
  resultsLis:IResultsRes[]=[]
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
  constructor(private _ResultsService:ResultsService ,private _Router:Router ){

  }

  ngOnInit(): void {
    this.quizessResaults()
  }

  viewFunction(row: any): void { 
    //
  }

  quizessResaults(): void {
    this._ResultsService.getAllResults().subscribe({
      next:(res:IResultsRes[])=>{
        this.resultsLis=res;
      }
    
    });

  }

  viewResults( row: IResultsRes): void {
    this._ResultsService.getResultView(row)
 this._Router.navigate(['/dashboard/student/results/results-view'])
  }

}
