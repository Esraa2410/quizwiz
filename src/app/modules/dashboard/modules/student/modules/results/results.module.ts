import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './results.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ResultsVeiwComponent } from './components/results-veiw/results-veiw.component';
import { ResultsService } from './services/results.service';


@NgModule({
  declarations: [
    ResultsComponent,
    ResultsVeiwComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    SharedModule
  ],providers:[ResultsService]
})
export class ResultsModule { }
