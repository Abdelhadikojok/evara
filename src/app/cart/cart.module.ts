import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SharedMModule } from '../shared-m/shared-m.module';
import { CartOrderComponent } from './cart-order/cart-order.component';
import { CartTableComponent } from './cart-table/cart-table.component';


@NgModule({
  declarations: [
    CartComponent,
    CartOrderComponent,
    CartTableComponent,
  ],
  imports: [
    CommonModule,
    SharedMModule,
    CartRoutingModule,
    IonicModule,
    FormsModule,
  ],
  exports: [CartComponent]

})
export class CartModule { }
