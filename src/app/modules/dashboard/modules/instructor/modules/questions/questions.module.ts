import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { QuestionsService } from './services/questions.service';


@NgModule({
  declarations: [
    QuestionsComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule
  ],
  providers: [ QuestionsService ]
})
export class QuestionsModule { }
