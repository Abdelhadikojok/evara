import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Ecommerce';
  authSubscription !: Subscription

  constructor(private authService: AuthService, private cartService: CartService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn.subscribe()
    this.authService.outoLogIn()
    this.authService
    const localStorageCartItems = localStorage.getItem('cartItems');
    if (localStorageCartItems !== null) {

      const retrievedArray = JSON.parse(localStorageCartItems);
      console.log('dd', retrievedArray);
      if (retrievedArray && retrievedArray.length > 0) {
        this.cartService.cartItemSubject.next(JSON.parse(localStorageCartItems))
      }
    }

    this.cartService.numberOfItems.next(this.cartService.cartItemSubject.value.length)

  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe
    }
  }
}
