import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { StudentQuizComponent } from './modules/quizzes/components/student-quiz/student-quiz.component';
import { QuizCodeComponent } from './modules/quizzes/components/quiz-code/quiz-code.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';


@NgModule({
  declarations: [
    StudentComponent,
    StudentQuizComponent,
    QuizCodeComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ]
})
export class StudentModule { }
