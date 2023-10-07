import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingComponent } from './shopping.component';
import { FavoriteShoppingItemComponent } from './favorite-shopping-item/favorite-shopping-item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

const routes: Routes = [
  { path: '', component: ShoppingComponent },
  { path: 'favorite-item', component: FavoriteShoppingItemComponent },
  { path: 'item-details/:id', component: ItemDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
