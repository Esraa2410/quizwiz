import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzesComponent } from './quizzes.component';
import { StudentQuizComponent } from './components/student-quiz/student-quiz.component';
import { QuizzesHomeComponent } from './components/quizzes-home/quizzes-home.component';

const routes: Routes = [
  {
    path: '',
    component: QuizzesComponent,
    children: [
      { path: '', redirectTo: 'quizzes-home', pathMatch: 'full' },
      { path: 'quizzes-home', component: QuizzesHomeComponent, title: 'Quizzes' },
      { path: 'student-quiz/:id', component: StudentQuizComponent, title: 'Quiz' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzesRoutingModule {}
