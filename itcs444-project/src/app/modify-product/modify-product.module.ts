import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyProductPageRoutingModule } from './modify-product-routing.module';

import { ModifyProductPage } from './modify-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyProductPageRoutingModule
  ],
  declarations: [ModifyProductPage]
})
export class ModifyProductPageModule {}
