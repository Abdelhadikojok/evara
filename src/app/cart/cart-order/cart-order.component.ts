import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { UserReg } from 'src/app/models/user-reg';
import { CartService } from 'src/app/services/cart.service';
import { HttpService } from 'src/app/services/http.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart-order',
  templateUrl: './cart-order.component.html',
  styleUrls: ['./cart-order.component.css']
})
export class CartOrderComponent implements OnInit {
  order !: Order
  orderItems: { id: string | undefined, singleItemCount: number, name: string }[] = []
  userId: string = ''
  Items: Cart[] = []
  cartItemSubjectSubscription !: Subscription
  userIdSubscription !: Subscription
  defaultUser !: UserReg

  constructor(private orderService: OrderService,
    private cartService: CartService,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.cartItemSubjectSubscription = this.cartService.cartItemSubject.subscribe(res => {
      this.Items = res
      const arr: { id: string | undefined, singleItemCount: number, name: string }[] = []
      res.map(elem => {
        arr.push({ id: elem.id, singleItemCount: elem.singleItemCount, name: elem.name })
      })
      this.orderItems = arr
    })
    this.userIdSubscription = this.orderService.userId.subscribe(res => this.userId = res)



  }

  onSubmit(contactForm: NgForm) {
    this.order = {
      name: `${contactForm.value.firstname} ${contactForm.value.lastname}`,
      address: contactForm.value.address,
      userId: this.userId,
      date: new Date(),
      products: this.orderItems
    }

    for (let item of this.Items) {
      this.httpService.updateQuantity(item, item.singleItemCount)
    }
    console.log('success in order');
    setTimeout(() => {
      this.cartService.clearCart()
    }, 3000);
    console.log(this.order)
    this.orderService.addOrder(this.order)

    contactForm.reset()
  }
}
