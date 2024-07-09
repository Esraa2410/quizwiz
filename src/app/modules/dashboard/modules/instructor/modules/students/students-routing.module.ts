import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentsWithoutGroupComponent } from './components/students-without-group/students-without-group.component';
import { GroupsComponent } from './components/groups/groups.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full', data: { animation: 'InstructorStudentListPage' } },
      { path: '', component: StudentListComponent, title: 'Student List', data: { animation: 'InstructorStudentListPage' } },
      {
        path: 'students-without-group',
        component: StudentsWithoutGroupComponent,
        title: 'Students without group',
        data: { animation: 'InstructorStudentsWithoutGroupPage' }
      },
      { path: 'groups/:id', component: GroupsComponent, title: 'Groups', data: { animation: 'InstructorGroupsPage' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
