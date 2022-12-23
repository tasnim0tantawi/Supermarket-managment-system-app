import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'owner',
    loadChildren: () => import('./owner/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'supplier',
    loadChildren: () => import('./supplier/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'addshift',
    loadChildren: () => import('./addshift/addshift.module').then( m => m.AddshiftPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./owner/add-product/add-product.module').then(m => m.AddProductPageModule)
  },

  {
    path: 'product-details',
    loadChildren: () => import('./product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'owner-orders',
    loadChildren: () => import('./owner/owner-orders/owner-orders.module').then(m => m.OwnerOrdersPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
