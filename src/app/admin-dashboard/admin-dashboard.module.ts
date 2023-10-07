import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AddingItemComponent } from './adding-item/adding-item.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { environment } from 'src/environments/environment';
import { SharedMModule } from '../shared-m/shared-m.module';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AddingItemComponent,

  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    FormsModule,
    MatTabsModule,
    SharedMModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
  ]
})
export class AdminDashboardModule { }
