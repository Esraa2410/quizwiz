import { ResultsVeiwComponent } from './components/results-veiw/results-veiw.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results.component';


const routes: Routes = [
  { path: '', component: ResultsComponent, data: { animation: 'ResultsListPage' } },
  { path: 'results-view', component: ResultsVeiwComponent, data: { animation: 'ResultsViewPage' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
