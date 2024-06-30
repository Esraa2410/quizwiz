import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestulsComponent } from './restuls.component';
import { ResultsViewComponent } from './components/results-view/results-view.component';

const routes: Routes = [
  { path: '', component: RestulsComponent, children: [
    { path: 'results-view', component: ResultsViewComponent, title: 'Results View' }
  ] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestulsRoutingModule { }
