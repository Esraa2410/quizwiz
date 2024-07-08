import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuizzesComponent } from './quizzes.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

import { StudentQuizComponent } from './components/student-quiz/student-quiz.component';
import { QuizCodeComponent } from './components/quiz-code/quiz-code.component';
import { QuizPopComponent } from './components/quiz-pop/quiz-pop.component';
import { StudentQuizService } from './service/studentQuiz.service';
import { QuizzesHomeComponent } from './components/quizzes-home/quizzes-home.component';
import { QuizTimesUpComponent } from './components/quiz-times-up/quiz-times-up.component';


@NgModule({
  declarations: [
    QuizzesComponent,
    StudentQuizComponent,
    QuizCodeComponent,
    QuizPopComponent,
    QuizzesHomeComponent,
    QuizTimesUpComponent
  ],
  imports: [
    CommonModule,
    QuizzesRoutingModule,
    SharedModule
  ],
  providers: [ StudentQuizService ]
})
export class QuizzesModule { }
