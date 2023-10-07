import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard.component';
import { IonicModule } from '@ionic/angular';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserDashboardComponent,
    MyOrdersComponent,
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class UserDashboardModule { }
