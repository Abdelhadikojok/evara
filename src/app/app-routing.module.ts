import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { AboutUsComponent } from './shared/about-us/about-us.component';
import { ContactUsComponent } from './shared/contact-us/contact-us.component';
import { AdminGuard } from './helpers/admin.guard';
import { UnautherizedComponent } from './shared/unautherized/unautherized.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'unAutherized', component: UnautherizedComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'shopping', loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule) },
  { path: 'admin-dashboard', loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule), canActivate: [AdminGuard] },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule), canActivate: [AuthGuard] },
  { path: 'shared', loadChildren: () => import('./shared-m/shared-m.module').then(m => m.SharedMModule) },
  { path: 'user-dashboard', loadChildren: () => import('./user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule), canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
