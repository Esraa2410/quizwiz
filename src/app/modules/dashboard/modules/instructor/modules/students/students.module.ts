import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { StudentsService } from './services/students.service';
import { AddStudentGroupComponent } from './components/add-student-group/add-student-group.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DropdownModule } from 'primeng/dropdown';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { GroupsService } from '../groups/services/groups.service';

import { StudentsWithoutGroupComponent } from './components/students-without-group/students-without-group.component';
import { GroupsComponent } from './components/groups/groups.component';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { VeiwDeleteStudentComponent } from './components/veiw-delete-student/veiw-delete-student.component';
import { VeiwDeleteStudentGroupComponent } from './components/veiw-delete-student-group/veiw-delete-student-group.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentListComponent,
    AddStudentGroupComponent,
    VeiwDeleteStudentComponent,
    VeiwDeleteStudentGroupComponent,
    StudentsWithoutGroupComponent,
    GroupsComponent,
  ],
  imports: [
    MatIconModule,
    MatMenuModule,
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    StudentsRoutingModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    DropdownModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],

  providers: [StudentsService, GroupsService],
 
 
})
export class StudentsModule {}
