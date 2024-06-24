import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./modules/student/student.module').then((m) => m.StudentModule),
  },
  {
    path: 'instructor',
    loadChildren: () =>
      import('./modules/instructor/instructor.module').then(
        (m) => m.InstructorModule
      ),
  },
  { path: 'group', loadChildren: () => import('./modules/instructor/group/group.module').then(m => m.GroupModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
