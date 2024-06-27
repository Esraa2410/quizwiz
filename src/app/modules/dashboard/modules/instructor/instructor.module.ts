import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';


@NgModule({
  declarations: [
    InstructorComponent
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    SharedModule
  ]
})
export class InstructorModule { }
