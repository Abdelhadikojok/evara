import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  categories: any[] = [
    { name: 'Clothes', image: 'https://firebasestorage.googleapis.com/v0/b/abdelhadi-ecommerce-app.appspot.com/o/category-1.jpg?alt=media&token=d81edaeb-b6b6-4f24-8488-2dea4a6f5d89' },
    { name: 'HandBag', image: 'https://firebasestorage.googleapis.com/v0/b/abdelhadi-ecommerce-app.appspot.com/o/category-2.jpg?alt=media&token=d94342b3-e1b0-4126-9470-49556b91d14f' },
    { name: 'Sandal', image: 'https://firebasestorage.googleapis.com/v0/b/abdelhadi-ecommerce-app.appspot.com/o/category-3.jpg?alt=media&token=7e84f71a-d662-479f-bd94-9cc2139b7230' },
    { name: 'Caps', image: 'https://firebasestorage.googleapis.com/v0/b/abdelhadi-ecommerce-app.appspot.com/o/category-4.jpg?alt=media&token=7ef304c3-aea0-4b58-94f4-1c8edef49d7b' },
    { name: 'Shoes', image: 'https://firebasestorage.googleapis.com/v0/b/abdelhadi-ecommerce-app.appspot.com/o/category-5.jpg?alt=media&token=52a69211-db39-4374-8382-e3b7460442bf' },
    { name: 'Pillowcase', image: 'https://firebasestorage.googleapis.com/v0/b/abdelhadi-ecommerce-app.appspot.com/o/category-6.jpg?alt=media&token=4b486735-0fd2-41ab-b728-da7028c3c13b' },
    { name: 'Jumpsuits', image: 'https://firebasestorage.googleapis.com/v0/b/abdelhadi-ecommerce-app.appspot.com/o/category-7.jpg?alt=media&token=2da3fec8-6880-4cf2-8a05-8cda1c96e0a6' },
    { name: 'Hats', image: 'https://firebasestorage.googleapis.com/v0/b/abdelhadi-ecommerce-app.appspot.com/o/category-8.jpg?alt=media&token=df17a0a9-55ce-4c70-9961-35eff958f5e7' },
  ]
  @ViewChild('slider') swiperRef!: ElementRef;
  swiper?: Swiper
  loggedIn = false
  authSubscription !: Subscription
  constructor(private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0)
    this.authSubscription = this.auth.isLoggedIn.subscribe(res => this.loggedIn = res)
  }

  navigateToShop() {
    this.router.navigate(['/shopping'])
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper
  }

  next() {
    this.swiper?.slideNext;

  }

  prev() {
    this.swiper?.slidePrev();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
  }

}
