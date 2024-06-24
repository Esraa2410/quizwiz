import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { HttpClientModule } from '@angular/common/http';
import { GroupService } from './services/group.service';
import { VeiwGroupComponent } from './components/veiw-group/veiw-group.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DropdownModule } from 'primeng/dropdown';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GroupComponent,
    VeiwGroupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    GroupRoutingModule,
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
  providers:[
    GroupService
  ]
})
export class GroupModule { }
