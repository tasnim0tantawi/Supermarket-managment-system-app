import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllOrdersPage } from './all-orders.page';

const routes: Routes = [
  {
    path: '',
    component: AllOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllOrdersPageRoutingModule {}
