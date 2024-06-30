import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestulsRoutingModule } from './restuls-routing.module';
import { RestulsComponent } from './restuls.component';


@NgModule({
  declarations: [
    RestulsComponent
  ],
  imports: [
    CommonModule,
    RestulsRoutingModule
  ]
})
export class RestulsModule { }
