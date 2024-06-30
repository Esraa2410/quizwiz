import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestulsRoutingModule } from './restuls-routing.module';
import { RestulsComponent } from './restuls.component';
import { ResultsViewComponent } from './components/results-view/results-view.component';


@NgModule({
  declarations: [
    RestulsComponent,
    ResultsViewComponent
  ],
  imports: [
    CommonModule,
    RestulsRoutingModule
  ]
})
export class RestulsModule { }
