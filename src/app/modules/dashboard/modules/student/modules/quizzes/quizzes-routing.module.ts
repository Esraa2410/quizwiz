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
      { path: '', redirectTo: 'quizzes-home', pathMatch: 'full', data: { animation: 'QuizzesHomePage' } },
      { path: 'quizzes-home', component: QuizzesHomeComponent, title: 'Quizzes', data: { animation: 'QuizzesHomePage' } },
      { path: 'student-quiz/:id', component: StudentQuizComponent, title: 'Quiz', data: { animation: 'StudentQuizPage' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzesRoutingModule {}
