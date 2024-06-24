import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './instructor.component';

const routes: Routes = [{ path: '', component: InstructorComponent }, { path: 'groups', loadChildren: () => import('./modules/groups/groups.module').then(m => m.GroupsModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
