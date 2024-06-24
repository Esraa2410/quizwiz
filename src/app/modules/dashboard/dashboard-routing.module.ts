import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '', component: HomeComponent, title: 'Dashboard' },
      {
        path: 'student',
        loadChildren: () =>
          import('./modules/student/student.module').then(
            (m) => m.StudentModule
          ),
      },
      {
        path: 'instructor',
        loadChildren: () =>
          import('./modules/instructor/instructor.module').then(
            (m) => m.InstructorModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
