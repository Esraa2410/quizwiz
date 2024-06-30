import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestulsComponent } from './restuls.component';

const routes: Routes = [{ path: '', component: RestulsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestulsRoutingModule { }
