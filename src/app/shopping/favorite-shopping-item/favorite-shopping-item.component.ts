import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { Like } from 'src/app/models/like';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-favorite-shopping-item',
  templateUrl: './favorite-shopping-item.component.html',
  styleUrls: ['./favorite-shopping-item.component.css']
})
export class FavoriteShoppingItemComponent implements OnInit {
  @Input() isloading = true
  cards: Like[] = []

  constructor(private http: HttpService) { }


  ngOnInit(): void {
    this.getData()
  }

  getData() {
    const userid = JSON.parse(localStorage.getItem('user') || '')
    this.http.getLikes(userid.localId).subscribe(res => {
      this.cards = res
      this.isloading = false
    })
  }

}
