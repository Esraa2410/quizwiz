import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IBreadCrumb } from 'src/app/modules/shared/models/shared';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss']
})
export class ViewQuizComponent {
  constructor(private _Router:Router){

  }
  navigationList: IBreadCrumb[] = [
    { label: 'Quizes', url: '/dashboard/instructor/quizzes' },
    { label: 'View' }
  ]
 
  btnText: string = 'Dashboard';
  btnIcon: string = "";


  GoToDashBoard(){
   this._Router.navigateByUrl('/dashboard')
  }

}
