import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddshiftPage } from './addshift.page';

const routes: Routes = [
  {
    path: '',
    component: AddshiftPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddshiftPageRoutingModule {}
