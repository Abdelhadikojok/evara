import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  cartItems: Cart[] = []
  filteredItems: Cart[] = []
  orderTableHeaders = ['name', 'date', 'items', 'addrees']
  totalPrice = 0
  _filterTxt = ''
  userOrders: Order[] = []
  userId: string = ''
  userIdSubscription !: Subscription
  getOrderSubscription !: Subscription

  constructor(private cartService: CartService, private orderService: OrderService) {
  }
  ngOnInit(): void {
    this.userIdSubscription = this.orderService.userId.subscribe(res => this.userId = res)
    this.userIdSubscription = this.orderService.getOrders().subscribe(res => {
      const arr: Order[] = []
      for (let order of res) {
        if (order.userId == this.userId) {
          arr.push(order)
        }
      }
      this.userOrders = arr
    }
    )
  }

  deleteItem(item: Order) {
    // this.cartService.deleteItem(item);
    // this.filteredItems = this.filteredItems.filter(elem => item.id != elem.id);
  }

  ngOnDestroy(): void {
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe()
    }
    if (this.getOrderSubscription) {
      this.userIdSubscription.unsubscribe()
    }
  }


}

