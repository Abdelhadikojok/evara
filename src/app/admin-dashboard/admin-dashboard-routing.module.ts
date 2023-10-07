import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AddingItemComponent } from './adding-item/adding-item.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'add-item', component: AddingItemComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
