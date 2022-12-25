import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingRejectedOrdersPageRoutingModule } from './pending-rejected-orders-routing.module';

import { PendingRejectedOrdersPage } from './pending-rejected-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingRejectedOrdersPageRoutingModule
  ],
  declarations: [PendingRejectedOrdersPage]
})
export class PendingRejectedOrdersPageModule {}
