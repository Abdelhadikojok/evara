import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/models/item';
import { CartService } from 'src/app/services/cart.service';
import { HttpService } from 'src/app/services/http.service';
import * as alertify from 'alertifyjs'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css']
})
export class ShoppingItemComponent implements OnInit, OnDestroy {
  filledStarNumber: number = 0
  emptyStarNumber: number = 0
  filledStars: any[] = [];
  emptyStars: any[] = [];
  isAdmin = false
  likedItem = false
  isAdminSubscription !: Subscription
  postSubscription !: Subscription
  adminDeleteByIdSubscription !: Subscription

  @Output() deletedItem: EventEmitter<Item> = new EventEmitter();
  @Input() item: Item = {
    id: "",
    name: "",
    description: "",
    reviewsNb: 0,
    reviewsTotal: 0,
    price: 0,
    likes: 0,
    quantity: 0,
    images: {
      imageOne: "",
      imageTwo: "",
    },
    category: "",
    brand: "",
    selledNb: 0,
    postDate: new Date()
  }

  constructor(private http: HttpService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.item.reviewsNb == 0) {
      this.item.reviewsNb = 1
    }
    this.filledStarNumber = Math.floor(this.item.reviewsTotal / this.item.reviewsNb);
    this.emptyStarNumber = 5 - this.filledStarNumber
    this.filledStars = new Array(this.filledStarNumber);
    this.emptyStars = new Array(this.emptyStarNumber);
    this.authService.isAdminUser.subscribe(res => this.isAdmin = res)

  }


  addOrRemoveToFavorite(item: Item) {
    const userId = JSON.parse(localStorage.getItem('user') || '')
    this.postSubscription = this.http.postLikes({ userId: userId.localId, liked: true, items: [{ ...item }] }).subscribe(res => {
      alertify.success('success like')
    })
  }


  addToCart(item: Item) {

    if (item.quantity == 0 || this.cartService.numberOfItems.value > item.quantity) {
      alertify.error("cant add it's Sold Out")
    } else {
      this.cartService.addToCart({ ...item, singleItemCount: 1 })
    }
  }

  deleteItem(id: string, item: Item) {
    if (id) {
      console.log(id);
      this.adminDeleteByIdSubscription = this.http.adminDeleteById(id).subscribe({
        next: (res) => {
          // this.router.navigate(['/shopping'])
          this.deletedItem.emit(item)
          alertify.success('Item is deleted');
        },
        error: (error) => {
          alertify.error('Cannot be deleted', error);
        },
      });
    } else {
      console.error('Invalid item ID');
    }
  }


  updateItem(id: string) {
    this.router.navigate(['/admin-dashboard/add-item'], {
      queryParams: { update: id }
    });
  }

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
    if (this.adminDeleteByIdSubscription) {
      this.adminDeleteByIdSubscription.unsubscribe()
    }
    if (this.isAdminSubscription) {
      this.isAdminSubscription.unsubscribe
    }
  }

}
