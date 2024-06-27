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
import { SharedTableComponent } from './components/shared-table/shared-table.component';
import { DynamicdatePipe } from './pipes/date/dynamicdate.pipe';
import { SharedMainHeaderComponent } from './components/shared-main-header/shared-main-header.component';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    PaginatorModule,
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
    SharedTableComponent,
    DynamicdatePipe,
    SharedMainHeaderComponent,
  ],
})
export class SharedModule {}
