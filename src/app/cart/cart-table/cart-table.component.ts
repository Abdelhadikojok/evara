import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-table',
  templateUrl: './cart-table.component.html',
  styleUrls: ['./cart-table.component.css']
})
export class CartTableComponent implements OnInit, OnDestroy {
  cartItems: Cart[] = []
  filteredItems: Cart[] = []
  cartTableHeaders = ['item', 'name', 'price', 'quantity', 'total', ""]
  totalPrice = 0
  _filterTxt = ''
  deleteMode = false
  itemToDelete !: Cart
  cartItemSubscription !: Subscription
  constructor(private cartService: CartService) {
  }
  ngOnInit(): void {
    this.cartItemSubscription = this.cartService.cartItemSubject.subscribe(res => {
      this.cartItems = res;
      console.log('aloo');
      console.log("suscribed subject", res);
      this.totalPrice = 0
      for (let item of res) {
        this.totalPrice += +(item.price * item.singleItemCount).toFixed(2)
      }
      this.filteredItems = this.cartItems
    });
  }
  filteringItem(filterItem: string) {
    if (filterItem === '' || this.cartItems.length == 0) {
      return this.cartItems
    } else {
      return this.cartItems.filter(elem => {
        return elem.category.includes(filterItem.toLowerCase())
      })
    }
  }

  onInputChange() {
    this.filteredItems = this.filteringItem(this._filterTxt)
  }


  increment(item: Cart) {
    this.cartService.incrementingData(item);
  }
  decrement(item: Cart) {
    this.cartService.decrementingData(item);
  }

  removeItem() {
    this.cartService.deleteItem(this.itemToDelete);
    this.filteredItems = this.filteredItems.filter(elem => this.itemToDelete.id != elem.id);
    window.addEventListener('DOMContentLoaded', () => {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    });

  }

  changeDeleteModetoTrue(cartItem: Cart) {
    this.itemToDelete = cartItem
    this.deleteMode = true
  }

  changeDeleteModetoFalse() {
    this.deleteMode = false
  }

  ngOnDestroy(): void {
    if (this.cartItemSubscription) {
      this.cartItemSubscription.unsubscribe()
    }
  }


}

