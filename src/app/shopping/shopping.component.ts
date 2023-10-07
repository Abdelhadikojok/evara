import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Item } from '../models/item';
import { CartService } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void => *', animate('500ms ease-in')),
      transition('* => void', animate('500ms ease-out')),
    ])
  ]
})
export class ShoppingComponent implements OnInit {
  isloading = true
  cards: Item[] = []
  filteredText = "";
  favoriteStatus: boolean = false
  deletedItem!: Item
  shoopingItemIsEmpty = false
  constructor(private http: HttpService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getData()
    this.cartService.filterInputVlaueSubject.subscribe(res => this.filteredText = res)
    window.scrollTo(0, 0)
  }

  getData() {
    this.http.getData().subscribe(res => {
      this.route.queryParamMap.subscribe(queryParams => {
        if (queryParams.has('category')) {
          const paramValue = queryParams.get('category');
          this.cards = res.filter(elem => elem.category == paramValue?.toLocaleLowerCase());
          if (this.cards.length == 0) {
            this.shoopingItemIsEmpty = true
          }
          console.log(`Query parameter 'yourParam' exists with value: ${paramValue?.toLocaleLowerCase()}`);
        } else {
          this.cards = res;
          console.log(res)
        }
        this.isloading = false
      });

    })
  }

  handleDeletedItem(eventData: any) {
    this.deletedItem = eventData;
    console.log('delted elem from home page : ', this.deletedItem);
    this.http.getData().subscribe(res => {
      this.cards = res.filter(elem => elem != this.deletedItem)
    })

  }

}
