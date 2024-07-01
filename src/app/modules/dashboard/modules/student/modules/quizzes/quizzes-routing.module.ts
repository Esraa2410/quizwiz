import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzesComponent } from './quizzes.component';
import { StudentQuizComponent } from './components/student-quiz/student-quiz.component';

const routes: Routes = [
  {
    path: '',
    component: QuizzesComponent,
    children: [
      { path: 'student-quiz', component: StudentQuizComponent, title: 'Quiz' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzesRoutingModule {}
