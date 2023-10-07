import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  toggle: boolean = false;
  isLoggedIn: boolean = false
  cart_NbOfItems: number = 0;
  cartItems: Cart[] = []
  closeElement: boolean = false;
  filterInputVlaue: string = ""
  isadmin = false
  isMenuOpened: boolean = false;


  constructor(private elementRef: ElementRef,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(res => {
      this.isLoggedIn = res
    })
    this.authService.isAdminUser.subscribe(res => this.isadmin = res)

    this.cartService.numberOfItems.subscribe(res => this.cart_NbOfItems = res)
  }

  changeToggleValue() {
    this.toggle = !this.toggle
  }

  logOut() {
    this.authService.logout()
  }

  navigateToHome() {
    this.router.navigate(['/home'])
  }

  nvaigateTo() {
    if (this.isadmin) {
      this.router.navigate(['/admin-dashboard/add-item'])

    } else {
      this.router.navigate(['/user-dashboard'])

    }
  }

  toggleCart(event: any) {
    this.isMenuOpened = event
  }

  clickedOutside(): void {
    this.isMenuOpened = false;
  }

  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }

  ss() {
    this.cartService.filterInputVlaueSubject.next(this.filterInputVlaue)
  }
}
