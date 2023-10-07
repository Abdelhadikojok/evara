import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-menue',
  templateUrl: './cart-menue.component.html',
  styleUrls: ['./cart-menue.component.css']
})
export class CartMenueComponent implements OnInit, OnDestroy {
  cartItems: Cart[] = []
  totalPrice: number = 0
  cart_NbOfItems: number = 0;
  numberOfItemSubscription !: Subscription
  cartItemSubjectSubscription !: Subscription


  constructor(private cartService: CartService, private router: Router) { }
  @Output() toggleCart = new EventEmitter<boolean>();
  ngOnInit(): void {


    this.numberOfItemSubscription = this.cartService.numberOfItems.subscribe(res => this.cart_NbOfItems = res)
    this.cartItemSubjectSubscription = this.cartService.cartItemSubject.subscribe(res => {
      this.cartItems = res;
      this.totalPrice = 0
      for (let item of this.cartItems) {
        this.totalPrice += (item.price * item.singleItemCount)
      }
      console.log("suscribed subject in the header", res);
    });

  }

  increment(item: Cart) {
    this.cartService.incrementingData(item)
  }
  decrement(item: Cart) {
    this.cartService.decrementingData(item)
  }

  clickOutside(event: any) {
    console.log(event);
    console.log('abeeeeee');
  }

  navigateAndClose() {
    this.router.navigate(["/cart"])
    this.toggleCart.emit(false);
  }

  ngOnDestroy(): void {
    if (this.numberOfItemSubscription) {
      this.numberOfItemSubscription.unsubscribe()
    }
    if (this.cartItemSubjectSubscription) {
      this.cartItemSubjectSubscription.unsubscribe()
    }
  }
}
