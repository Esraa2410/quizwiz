import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { HttpClientModule } from '@angular/common/http';
import { GroupsService } from './services/groups.service';
import { VeiwGroupComponent } from './components/veiw-group/veiw-group.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  declarations: [
    GroupsComponent,
    VeiwGroupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    GroupsRoutingModule,
    SharedModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    DropdownModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MultiSelectModule
  ],
  providers: [
    GroupsService
  ]
})
export class GroupsModule { }
