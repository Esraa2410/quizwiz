import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuizzesComponent } from './quizzes.component';

import { SharedModule } from 'src/app/modules/shared/shared.module';
import { QuizItemComponent } from './components/quiz-item/quiz-item.component';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';


@NgModule({
  declarations: [
    QuizzesComponent,
    QuizItemComponent,
    ViewQuizComponent
  ],
  imports: [
    CommonModule,
    QuizzesRoutingModule,
    SharedModule
  ]
})
export class QuizzesModule { }
