import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnerStatisticsPageRoutingModule } from './owner-statistics-routing.module';

import { OwnerStatisticsPage } from './owner-statistics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnerStatisticsPageRoutingModule
  ],
  declarations: [OwnerStatisticsPage]
})
export class OwnerStatisticsPageModule {}
