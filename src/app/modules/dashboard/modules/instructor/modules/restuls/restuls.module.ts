import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestulsRoutingModule } from './restuls-routing.module';
import { RestulsComponent } from './restuls.component';
import { ResultsViewComponent } from './components/results-view/results-view.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ResultsService } from './services/results.service';
import { ResultsListComponent } from './components/results-list/results-list.component';


@NgModule({
  declarations: [
    RestulsComponent,
    ResultsViewComponent,
    ResultsListComponent
  ],
  imports: [
    CommonModule,
    RestulsRoutingModule,
    SharedModule,
    
  ],
  providers:[ResultsService]
})
export class RestulsModule { }
