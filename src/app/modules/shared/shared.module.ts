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
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    PaginatorModule
  ],
  declarations: [
    SharedAuthComponent,
    SharedPagnationComponent,
    SharedHeaderComponent,
    SharedCardComponent,
  ],
  exports: [
    SharedAuthComponent,
    SharedPagnationComponent,
    SharedHeaderComponent,
    SharedCardComponent,
  ],
})
export class SharedModule {}
