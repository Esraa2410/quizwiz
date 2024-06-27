import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentsService } from './services/students.service';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { StudentListComponent } from './components/student-list/student-list.component';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule
  ],
  providers: [StudentsService]
})
export class StudentsModule { }
