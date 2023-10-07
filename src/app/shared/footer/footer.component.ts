import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  loggedIn = false
  sginUpText = ''
  contacts = {
    Address: 'tripoli , azzmi street, lebanon',
    phone: '+961 81 230 893',
    hours: '10:00 - 18:00 , mon - sat'
  }
  socialMediaLinks = {
    facebook: 'https://www.facebook.com/hadi.kojok.980/',
    instagram: 'https://www.instagram.com/abdelhadi.kojok/?next=%2F',
    email: 'abdelhadikojok8123@gmail.com',
    linkedIn: 'https://www.linkedin.com/in/abdelhadi-kojok-a5131b293/'
  }
  addresses = { 'About Us': '/about-us', 'delivery': '', 'contact Us': '/contact-us' }

  myAccount = { 'sign In': '/auth/login', 'view Cart': '/cart', 'order': '/user-dashboard' }

  private isLoggedInSubscription!: Subscription;


  constructor(private route: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn.subscribe(res => this.loggedIn = res)
  }

  goToSginUp() {
    this.authService.signUpTextValue.next(this.sginUpText)
    console.log('rr', this.authService.signUpTextValue.value)
    this.route.navigate(['/auth'])
  }

  ngOnDestroy(): void {
    if (this.isLoggedInSubscription) {
      this.isLoggedInSubscription.unsubscribe();
    }
  }

}
