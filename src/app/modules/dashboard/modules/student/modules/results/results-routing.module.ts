import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results.component';
import { ResultsVeiwComponent } from './components/results-veiw/results-veiw.component';

const routes: Routes = [
  { path: '', component: ResultsComponent },
  { path: 'results-view', component: ResultsVeiwComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule {
  
 }
