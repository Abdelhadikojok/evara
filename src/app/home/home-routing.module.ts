import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SliderImagesComponent } from './slider-images/slider-images.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'image-slider', component: SliderImagesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
