import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: 'results',
        loadChildren: () =>
          import('./modules/results/results.module').then(
            (m) => m.ResultsModule
          ),
      },
      {
        path: 'quizzes',
        loadChildren: () =>
          import('./modules/quizzes/quizzes.module').then(
            (m) => m.QuizzesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
