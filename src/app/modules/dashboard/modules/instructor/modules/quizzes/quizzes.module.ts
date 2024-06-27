import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuizzesComponent } from './quizzes.component';
import { QuizItemComponent } from './quiz-item/quiz-item.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';


@NgModule({
  declarations: [
    QuizzesComponent,
    QuizItemComponent
  ],
  imports: [
    CommonModule,
    QuizzesRoutingModule,
    SharedModule
  ]
})
export class QuizzesModule { }
