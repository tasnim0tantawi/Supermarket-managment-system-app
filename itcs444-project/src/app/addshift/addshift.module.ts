import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddshiftPageRoutingModule } from './addshift-routing.module';

import { AddshiftPage } from './addshift.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddshiftPageRoutingModule
  ],
  declarations: [AddshiftPage]
})
export class AddshiftPageModule {}
