import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { CartOrderComponent } from './cart-order/cart-order.component';

const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'cart-order', component: CartOrderComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
