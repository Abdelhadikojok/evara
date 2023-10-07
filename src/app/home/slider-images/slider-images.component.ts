import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-slider-images',
  templateUrl: './slider-images.component.html',
  styleUrls: ['./slider-images.component.css']
})
export class SliderImagesComponent implements OnInit {
  @Input() categories: any[] = []
  numberOFSlide = 0

  ngOnInit(): void {
    const sliderImagesWidth = 182 * this.categories.length
    this.numberOFSlide = (sliderImagesWidth - window.innerWidth) / 182
    console.log(Math.round(this.numberOFSlide));
  }

  slideIndex = 0;

  nextSlide() {

    if (this.slideIndex < this.numberOFSlide) {
      this.slideIndex++;
    }
  }

  prevSlide() {
    if (this.slideIndex > 0) {
      this.slideIndex--;
    }
  }
}
