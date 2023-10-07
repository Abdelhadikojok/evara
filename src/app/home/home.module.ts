import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
register();

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IonicModule } from '@ionic/angular';
import { HomeShoppingItemComponent } from './home-shopping-item/home-shopping-item.component';
import { SharedMModule } from '../shared-m/shared-m.module';
import { SliderImagesComponent } from './slider-images/slider-images.component';


@NgModule({
  declarations: [
    HomeComponent,
    HomeShoppingItemComponent,
    SliderImagesComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IonicModule,
    SharedMModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
