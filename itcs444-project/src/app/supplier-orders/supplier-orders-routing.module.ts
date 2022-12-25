import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierOrdersPage } from './supplier-orders.page';

const routes: Routes = [
  {
    path: '',
    component: SupplierOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierOrdersPageRoutingModule {}
