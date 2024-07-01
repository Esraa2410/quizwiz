import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuizzesComponent } from './quizzes.component';


@NgModule({
  declarations: [
    QuizzesComponent
  ],
  imports: [
    CommonModule,
    QuizzesRoutingModule
  ]
})
export class QuizzesModule { }
