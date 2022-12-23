import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnerOrdersPage } from './owner-orders.page';

const routes: Routes = [
  {
    path: '',
    component: OwnerOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerOrdersPageRoutingModule {}
