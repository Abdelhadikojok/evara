import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { CartService } from 'src/app/services/cart.service';
import { HttpService } from 'src/app/services/http.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-shopping-item',
  templateUrl: './home-shopping-item.component.html',
  styleUrls: ['./home-shopping-item.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('500ms ease-in')),
      transition('* => void', animate('500ms ease-out')),
    ])
  ]
})
export class HomeShoppingItemComponent implements OnInit, OnDestroy {
  cards: Item[] = []
  filterButtons = ['All', 'Most Rated', 'New Added']
  filteredText = "";
  favoriteStatus: boolean = false
  deletedItem!: Item
  isloading: boolean = true
  filterInputVlaueSubscription !: Subscription
  getDataSubscription !: Subscription

  constructor(private http: HttpService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getData()
    this.filterInputVlaueSubscription = this.cartService.filterInputVlaueSubject.subscribe(res => this.filteredText = res)
  }

  getData() {
    this.http.getData().subscribe(res => {
      const arr: Item[] = []
      for (let i = 0; i < 8; i++) {
        if (res[i]) {
          arr.push(res[i])
        }
      }
      this.cards = arr;
      this.isloading = false
      console.log(res)
    })
  }

  handleDeletedItem(eventData: any) {
    this.deletedItem = eventData;
    console.log('delted elem from home page : ', this.deletedItem);
    this.http.getData().subscribe(res => {
      this.cards = res.filter(elem => elem != this.deletedItem)
    })
  }
  ngOnDestroy(): void {
    if (this.filterInputVlaueSubscription) {
      this.filterInputVlaueSubscription.unsubscribe()
    }
    if (this.getDataSubscription) {
      this.getDataSubscription.unsubscribe()
    }
  }
}
