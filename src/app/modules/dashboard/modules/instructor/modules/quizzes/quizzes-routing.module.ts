import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzesComponent } from './quizzes.component';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';
import { QuizListComponent } from './components/quiz-list/quiz-list.component';

const routes: Routes = [
  { path: '', component: QuizzesComponent, data: { animation: 'InstructorQuizzesListPage' } },
  { path: 'view-quiz/:id', component: ViewQuizComponent, data: { animation: 'InstructorViewQuizPage' } },
  { path: 'all-quizzes', component: QuizListComponent, data: { animation: 'InstructorAllQuizzesPage' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzesRoutingModule { }
