import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results.component';
import { ResultsViewComponent } from '../../../instructor/modules/restuls/components/results-view/results-view.component';

const routes: Routes = [
  { path: '', component: ResultsComponent, data: { animation: 'ResultsListPage' } },
  { path: 'results-view', component: ResultsViewComponent, data: { animation: 'ResultsViewPage' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
