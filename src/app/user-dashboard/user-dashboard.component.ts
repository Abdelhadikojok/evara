import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserReg } from '../models/user-reg';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderService } from '../services/order.service';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  user: UserReg = {
    id: "",
    email: "",
    username: "",
    name: {
      firstname: "",
      lastname: ""
    },
    address: {
      country: ""
    },
    phone: ""
  }

  getUserSubscription !: Subscription

  userId: string = ""

  constructor(private http: HttpClient, private orderService: OrderService) {

  }

  ngOnInit(): void {
    this.getUser()
  }

  getUser() {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.userId = JSON.parse(userJSON).localId;
    }
    this.getUserSubscription = this.http.get<UserReg[]>(`${environment.apiUrl}/users.json`)
      .pipe(
        map((response) => {
          console.log(this.userId);

          const dataArray = [];
          for (const key in response) {
            if (response[key].id === this.userId)
              if (response.hasOwnProperty(key)) {
                dataArray.push(response[key]);
              }
          }
          return dataArray;
        }))
      .subscribe(res => {
        this.user = res[0]
      })
  }

  ngOnDestroy(): void {
    if (this.getUserSubscription) {
      this.getUserSubscription.unsubscribe()
    }
  }
}
