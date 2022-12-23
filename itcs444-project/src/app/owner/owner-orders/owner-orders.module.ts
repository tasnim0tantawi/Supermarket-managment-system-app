import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnerOrdersPageRoutingModule } from './owner-orders-routing.module';

import { OwnerOrdersPage } from './owner-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnerOrdersPageRoutingModule
  ],
  declarations: [OwnerOrdersPage]
})
export class OwnerOrdersPageModule {}
