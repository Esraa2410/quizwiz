import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { StudentsService } from './services/students.service';
import { AddStudentGroupComponent } from './components/add-student-group/add-student-group.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DropdownModule } from 'primeng/dropdown';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { GroupsService } from '../groups/services/groups.service';

@NgModule({
  declarations: [
    StudentsComponent,
    AddStudentGroupComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    DropdownModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers:[StudentsService , GroupsService]
})
export class StudentsModule { }
