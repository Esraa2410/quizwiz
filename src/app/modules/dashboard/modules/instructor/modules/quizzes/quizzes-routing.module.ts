import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzesComponent } from './quizzes.component';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';

const routes: Routes = [
  { path: '', component: QuizzesComponent },
  { path: 'view-Quiz/:id', component: ViewQuizComponent },
  { path: 'view-Quiz', component: ViewQuizComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzesRoutingModule { }
