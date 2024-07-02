import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';


@NgModule({
  declarations: [
    StudentComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ]
})
export class StudentModule { }
