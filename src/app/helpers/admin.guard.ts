import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  user: boolean | null = null
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.isAdminUser.subscribe(res => this.user = res)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.user) {
      console.log('he is admin');
      console.log("if true", this.user);

      return true
    }

    console.log("if false", this.user);

    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
