import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnerStatisticsPage } from './owner-statistics.page';

const routes: Routes = [
  {
    path: '',
    component: OwnerStatisticsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerStatisticsPageRoutingModule {}
