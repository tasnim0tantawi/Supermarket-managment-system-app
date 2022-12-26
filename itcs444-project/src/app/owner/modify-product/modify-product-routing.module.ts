import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyProductPage } from './modify-product.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyProductPageRoutingModule {}
