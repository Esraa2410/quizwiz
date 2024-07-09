import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { instructorGuard } from 'src/app/core/guards/instructor/instructor.guard';
import { studentGuard } from 'src/app/core/guards/student/student.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full', data: { animation: 'HomePage' } },
      { path: 'home', component: HomeComponent, title: 'Dashboard', data: { animation: 'HomePage' } },
      {
        path: 'student',
        canActivate: [studentGuard],
        loadChildren: () =>
          import('./modules/student/student.module').then(
            (m) => m.StudentModule
          ),
        data: { animation: 'StudentPage' }
      },
      {
        path: 'instructor',
        canActivate: [instructorGuard],
        loadChildren: () =>
          import('./modules/instructor/instructor.module').then(
            (m) => m.InstructorModule
          ),
        data: { animation: 'InstructorPage' }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
