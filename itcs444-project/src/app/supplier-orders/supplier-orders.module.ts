import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplierOrdersPageRoutingModule } from './supplier-orders-routing.module';

import { SupplierOrdersPage } from './supplier-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupplierOrdersPageRoutingModule
  ],
  declarations: [SupplierOrdersPage]
})
export class SupplierOrdersPageModule {}
