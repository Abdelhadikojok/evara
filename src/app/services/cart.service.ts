import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart';
import * as alertify from 'alertifyjs'


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemSubject = new BehaviorSubject<Cart[]>([])
  numberOfItems = new BehaviorSubject<number>(0)
  filterInputVlaueSubject = new BehaviorSubject<string>('')

  constructor() {
  }


  addToCart(item: Cart) {
    const items: Cart[] = [...this.cartItemSubject.value]
    const itemInCart = items.find((_item) => {
      return _item.id === item.id
    })
    if (itemInCart) {
      if (itemInCart.singleItemCount + 1 > item.quantity) {
        alertify.error('sold out')
        return
      }
      if (item.singleItemCount === 1) {
        itemInCart.singleItemCount++
        alertify.success('the item has been added to cart')
      } else {
        itemInCart.singleItemCount += item.singleItemCount
        alertify.success('the item has been added to cart')
      }
      console.log("ddddd", itemInCart.singleItemCount)
    } else {
      items.push(item)
      alertify.success('the item has been added to cart')
    }
    this.cartItemSubject.next(items);
    this.numberOfItems.next(this.cartItemSubject.value.length)
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemSubject.value));
  }

  incrementingData(item: Cart) {
    this.cartItemSubject.value.map(obj => {
      if (obj.id == item.id) {
        if (obj.singleItemCount < item.quantity) {
          obj.singleItemCount += 1
        } else {
          alertify.error('sold out')
        }
      }
    })
    this.cartItemSubject.next(this.cartItemSubject.value)
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemSubject.value));

  }


  decrementingData(item: Cart) {
    this.cartItemSubject.value.map(obj => {
      if (obj.id == item.id) {
        if (obj.singleItemCount == 1) {
          this.cartItemSubject.next(this.cartItemSubject.value.filter(objj => objj.id !== obj.id))
          localStorage.setItem('cartItems', JSON.stringify(this.cartItemSubject.value));
          this.numberOfItems.next(this.cartItemSubject.value.length)
        } else {
          obj.singleItemCount -= 1
          this.cartItemSubject.next(this.cartItemSubject.value)
          localStorage.setItem('cartItems', JSON.stringify(this.cartItemSubject.value));
        }
      }
    })
  }

  deleteItem(item: Cart) {
    const arry: Cart[] = []
    this.cartItemSubject.value.filter(elem => {
      if (item != elem) {
        arry.push(elem)
      }
    })
    this.cartItemSubject.next(arry)
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemSubject.value));
    this.numberOfItems.next(this.cartItemSubject.value.length)

  }

  clearCart() {
    localStorage.removeItem('cartItems')
    this.cartItemSubject.next([])
    this.numberOfItems.next(0)
  }
}

