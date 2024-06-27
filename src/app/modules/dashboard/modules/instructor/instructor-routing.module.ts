import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';

const routes: Routes = [
  { path: '', component: InstructorComponent },
  {
    path: 'groups',
    loadChildren: () =>
      import('./modules/groups/groups.module').then((m) => m.GroupsModule),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./modules/students/students.module').then(
        (m) => m.StudentsModule
      ),
  },
  {
    path: 'questions',
    loadChildren: () =>
      import('./modules/questions/questions.module').then(
        (m) => m.QuestionsModule
      ),
  },
  {
    path: 'quizzes',
    loadChildren: () =>
      import('./modules/quizzes/quizzes.module').then((m) => m.QuizzesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule {}
