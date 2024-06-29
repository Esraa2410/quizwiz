import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { QuestionsService } from './services/questions.service';
import { AddNewQuestionComponent } from './components/add-question/add-new-question/add-new-question.component';
import { VeiwDeleteQuestionComponent } from './components/veiw-delete-question/veiw-delete-question.component';


@NgModule({
  declarations: [
    QuestionsComponent,
    AddNewQuestionComponent,
    VeiwDeleteQuestionComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule
  ],
  providers: [ QuestionsService ]
})


export class QuestionsModule { }
