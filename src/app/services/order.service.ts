import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { Cart } from '../models/cart';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { BehaviorSubject, filter, map } from 'rxjs';
import { User } from '../models/user';
import { UserReg } from '../models/user-reg';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  userId = new BehaviorSubject<string>('')


  constructor(private cartService: CartService, private http: HttpClient, private authService: AuthService) {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      const user = JSON.parse(userJSON);
      this.userId.next(user.localId)
    }

  }

  getOrders() {
    return this.http.get<Order[]>(`${environment.apiUrl}/order.json`).pipe(
      map((response) => {
        const dataArray = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            dataArray.push(response[key]);
          }
        }
        return dataArray;
      })
    )
  }


  addOrder(order: Order) {
    this.http.post<Order[]>(`${environment.apiUrl}/order.json`, order).subscribe(() => {
      console.log('order is send');

    })
  }





}
