// shared-m.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingItemComponent } from './shopping-item/shopping-item.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { InfoDirectiveDirective } from '../shared/directive/info-directive.directive';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { CartMenueComponent } from '../shared/cart-menue/cart-menue.component';
import { CloseOutsideDirective } from '../shared/directive/close-outside.directive';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    ShoppingItemComponent,
    InfoDirectiveDirective,
    LoadingSpinnerComponent,
    CartMenueComponent,
    CloseOutsideDirective
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    NgxSkeletonLoaderModule

  ],
  exports: [
    ShoppingItemComponent,
    InfoDirectiveDirective,
    LoadingSpinnerComponent,
    CartMenueComponent,
    CloseOutsideDirective,
    NgxSkeletonLoaderModule,
    LoadingSpinnerComponent

  ]
})
export class SharedMModule { }
