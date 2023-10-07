import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedMModule } from '../shared-m/shared-m.module';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../shared/filter-pipe/filter.pipe';
import { FavoriteShoppingItemComponent } from './favorite-shopping-item/favorite-shopping-item.component';
import { FavoriteFilterPipe } from '../shared/favorite-pipe/favorite-filter.pipe';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { LoadingCardComponent } from './loading-card/loading-card.component';
import { EmptyShoppingCartComponent } from './empty-shopping-cart/empty-shopping-cart.component';

@NgModule({
  declarations: [
    ShoppingComponent,
    FilterPipe,
    FavoriteFilterPipe,
    FavoriteShoppingItemComponent,
    ItemDetailComponent,
    LoadingCardComponent,
    EmptyShoppingCartComponent,

  ],
  imports: [
    CommonModule,
    SharedMModule,
    ShoppingRoutingModule,
    FormsModule,
    IonicModule,
  ]
})
export class ShoppingModule { }
