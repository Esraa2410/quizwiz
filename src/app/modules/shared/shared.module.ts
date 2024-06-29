import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedAuthComponent } from './components/shared-auth/shared-auth.component';
import { SharedPagnationComponent } from './components/shared-pagnation/shared-pagnation.component';
import { PaginatorModule } from 'primeng/paginator';
import { SharedHeaderComponent } from './components/shared-header/shared-header.component';
import { SharedCardComponent } from './components/shared-card/shared-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import {ClipboardModule} from '@angular/cdk/clipboard';

import { SharedTableComponent } from './components/shared-table/shared-table.component';
import { DynamicdatePipe } from './pipes/date/dynamicdate.pipe';
import { SharedMainHeaderComponent } from './components/shared-main-header/shared-main-header.component';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { SpeedDialModule } from 'primeng/speeddial';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    PaginatorModule,
    MatDialogModule,
    MatButtonModule,
    DropdownModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MultiSelectModule,
    ClipboardModule,
   
    PaginatorModule,
    MenuModule,
    ButtonModule,
    SpeedDialModule,
    MatIconModule,
    MatMenuModule
  ],
  declarations: [
    SharedAuthComponent,
    SharedPagnationComponent,
    SharedHeaderComponent,
    SharedCardComponent,
    SharedTableComponent,
    DynamicdatePipe,
    SharedMainHeaderComponent
  ],
  exports: [
    SharedAuthComponent,
    SharedPagnationComponent,
    SharedHeaderComponent,
    SharedCardComponent,
    MatDialogModule,
    MatButtonModule,
    DropdownModule,
    MatSelectModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    SharedTableComponent,
    DynamicdatePipe,
    SharedMainHeaderComponent,
    MenuModule,
    ButtonModule,
    SpeedDialModule
  ],
})
export class SharedModule {}
