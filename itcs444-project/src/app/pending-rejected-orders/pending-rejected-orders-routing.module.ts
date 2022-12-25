import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingRejectedOrdersPage } from './pending-rejected-orders.page';

const routes: Routes = [
  {
    path: '',
    component: PendingRejectedOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingRejectedOrdersPageRoutingModule {}
