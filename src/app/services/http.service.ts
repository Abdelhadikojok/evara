import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import * as alertify from 'alertifyjs'
import { Cart } from '../models/cart';
import { Like } from '../models/like';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<Item>(`${this.apiUrl}/items.json`)
      .pipe(
        map(res => {
          const arrayOfItems: Item[] = []
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              arrayOfItems.push({ id: key, ...res[key] });
            }
          }
          return arrayOfItems
        })
      )
  }

  getDataTest() {
    return this.http.get<Item>(`${this.apiUrl}/items.json`)
  }

  getDataById(id: string) {
    return this.http.get<Item>(`${this.apiUrl}/items/${id}.json`)
  }


  updateData(item: Item, id: string) {
    return this.http.put<Item>(`${this.apiUrl}/items/${id}.json`, item).subscribe(res =>
      console.log('updated item  :  ', res),
      alertify.success('item added to favorite'),
    )
  }

  updateReviewsNumber(id: string | undefined, newReviewsNb: number, newReviewsTotal: number) {
    const url = `${environment.apiUrl}/items/${id}.json`;
    const data = { reviewsNb: newReviewsNb, reviewsTotal: newReviewsTotal };
    return this.http.patch(url, data);
  }

  postLikes(item: Like) {
    return this.http.post<{ name: string }>(`${this.apiUrl}/likes.json`, item)
  }

  getLikes(userId: string) {
    return this.http.get<Like[]>(`${this.apiUrl}/likes.json`)
      .pipe(
        map(res => {
          const arrayOfItems: Like[] = []
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              if (res[key].userId == userId) {
                arrayOfItems.push({ id: key, ...res[key] });
              }
            }
          }
          console.log('arrayOfItem', arrayOfItems);
          return arrayOfItems
        })
      )
  }

  // getLike(userId: string, itemId: string) {
  //   return this.http.get<Like[]>(`${this.apiUrl}/likes.json`)
  //     .pipe(
  //       map(res => {
  //         const arrayOfItems: Like[] = []
  //         for (const key in res) {
  //           if (res.hasOwnProperty(key)) {
  //             if (res[key].userId == userId && res[key].items[0].id == itemId) {
  //               arrayOfItems.push({ id: key, ...res[key] });
  //             }
  //           }
  //         }
  //         console.log('arrayOfItem', arrayOfItems);
  //         return arrayOfItems
  //       })
  //     )
  // }

  updateQuantity(item: Cart, quantityInCart: number): void {
    const newQuantity = item.quantity - quantityInCart;

    const url = `${environment.apiUrl}/items/${item.id}.json`;
    this.http.patch<Item>(url, { quantity: newQuantity }).subscribe(
    );
  }

  addShoppingItem(item: Item) {
    return this.http.post<Item>(`${this.apiUrl}/items.json`, item)
  }

  addminPostItem(item: Item) {
    return this.http.post<Item>(`${this.apiUrl}/items.json`, item)
  }

  adminDeleteById(itemId: string) {
    return this.http.delete(`${this.apiUrl}/items/${itemId}.json`)
  }

  adminUpdateItem(itemId: string, item: Item) {
    return this.http.put(`${this.apiUrl}/items/${itemId}.json`, item)
  }
}
