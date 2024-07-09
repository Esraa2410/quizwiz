import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestulsComponent } from './restuls.component';
import { ResultsViewComponent } from './components/results-view/results-view.component';
import { ResultsListComponent } from './components/results-list/results-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'results', pathMatch: 'full', data: { animation: 'InstructorResultsListPage' } },
  { path: 'results', component: ResultsListComponent, title: 'Results', data: { animation: 'InstructorResultsListPage' } },
  { path: 'results-view', component: ResultsViewComponent, title: 'Results View', data: { animation: 'InstructorResultsViewPage' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestulsRoutingModule { }
