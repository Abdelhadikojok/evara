import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs'
import { Item } from 'src/app/models/item';
import { CartService } from 'src/app/services/cart.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit, OnDestroy {

  private addRattingRunning = false;
  postLikeSubscription !: Subscription;
  updateReviewsNumberSubscription !: Subscription

  rating = [
    { name: "-outline", index: 1 },
    { name: "-outline", index: 2 },
    { name: "-outline", index: 3 },
    { name: "-outline", index: 4 },
    { name: "-outline", index: 5 },
  ]

  item: Item = {
    id: "",
    name: "",
    description: "",
    reviewsNb: 0,
    reviewsTotal: 0,
    price: 0,
    likes: 0,
    favorite: false,
    quantity: 0,
    images: {
      imageOne: "",
      imageTwo: "",
    },
    category: "",
    brand: "",
    selledNb: 0,
    postDate: new Date(),
  }
  id: string = "";
  subscription: Subscription | undefined;
  singleItemCount: number = 1

  constructor(private Route: ActivatedRoute, private http: HttpService, private cartService: CartService, private httpServeice: HttpService) {

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.Route.params.subscribe(
      (params: Params) => {
        this.id = params['id']
        console.log('sssss', this.id);

        this.subscription = this.http.getDataById(this.id).subscribe((res) => {
          if (res) {
            this.item = { ...res, id: this.id };
            console.log(this.item);
          }
        })
      }
    )
  }


  addToFavorite(item: Item) {
    const userId = JSON.parse(localStorage.getItem('user') || '')
    this.http.postLikes({ userId: userId.localId, liked: false, items: [{ ...item }] }).subscribe(res => {
      console.log('liked', res);
    })
  }

  addToCart(item: Item) {
    const singleItemCount = this.singleItemCount
    this.cartService.addToCart({ ...item, singleItemCount: singleItemCount })
  }

  onMouseEnter(index: number) {
    for (let i = 0; i < index; i++) {
      this.rating[i].name = ""
    }
  }

  onMouseLeave(index: number) {
    if (!this.addRattingRunning) {
      for (let i = 0; i < index; i++) {
        this.rating[i].name = "-outline";
      }
    }
  }

  addRatting(index: number) {
    this.httpServeice.getDataById(this.id).subscribe(res => {
      if (!this.addRattingRunning) {
        this.http.updateReviewsNumber(this.id, res.reviewsNb + 1, res.reviewsTotal + index).subscribe(res => {
          console.log('patch works', res)
          this.addRattingRunning = true;
        })
      }
    })

  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
    if (this.postLikeSubscription) {
      this.postLikeSubscription.unsubscribe()
    }
    if (this.updateReviewsNumberSubscription) {
      this.updateReviewsNumberSubscription.unsubscribe()
    }
  }



}
