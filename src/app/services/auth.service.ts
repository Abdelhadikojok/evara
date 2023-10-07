import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { Res } from '../models/response';
import { CartService } from './cart.service';
import { environment } from '../../environments/environment';
import { UserReg } from '../models/user-reg';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  userSubject = new BehaviorSubject<User | null>(null)
  isAdminUser = new BehaviorSubject<boolean>(false)
  signUpTextValue = new BehaviorSubject<string>('')
  isLoggedIn = new BehaviorSubject<boolean>(false);
  apiUrl = environment.apiUrl;
  experationTimeInterval: any
  constructor(
    private router: Router,
    private http: HttpClient,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.outoLogIn()
    if (this.userSubject) {
      this.isLoggedIn.next(true)
    }
    if (this.userSubject.value?.email == "hadi@gmail.com") {
      this.isAdminUser.next(true)
      localStorage.setItem('admin', 'true')
    }
  }

  signUp(email: string, password: string) {

    return this.http.post<Res>(`${environment.signUpUrl}`, { email: email, password: password, returnSecureToken: true })
      .pipe(catchError(err => {
        let errorMessage = "Unknow Error Message";
        if (!err.error || !err.error.error) {
          return throwError(errorMessage);
        }
        switch (err.error.error.message) {
          case "EMAIL_EXISTS":
            errorMessage = "The email address is already in use by another account.";
            break;
          case "OPERATION_NOT_ALLOWED":
            errorMessage = "Password sign-in is disabled for this project.";
            break;
          case "TOO_MANY_ATTEMPTS_TRY_LATER":
            errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
            break;
        }
        return throwError(errorMessage);
      }), tap(res => {
        localStorage.setItem('user', JSON.stringify(res));
        const timeToExpire = new Date(new Date().getDate() + +res.expiresIn * 1000)
        const user = new User(res.email, res.localId, res.idToken, timeToExpire)
        this.userSubject.next(user);
        this.isLoggedIn.next(true);
        this.autoLogout(+res.expiresIn * 1000)
        if (user.email == "hadi@gmail.com") {
          this.isAdminUser.next(true)
          localStorage.setItem('admin', 'true')
        }
        console.log(this.userSubject.value)
      })

      )
  }

  outoLogIn() {
    let user: {
      email: string;
      localId: string;
      idToken: string;
      expiresIn: string;
    } = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdminUser.next(JSON.parse(localStorage.getItem("admin") || 'false'))
    let logedInUser = new User(user.email, user.localId, user.idToken, new Date(user.expiresIn))
    if (logedInUser._token) {
      this.userSubject.next(logedInUser);
      let expireDate = new Date(user.expiresIn).getTime() - new Date().getTime()
      console.log('expire date', expireDate);
      this.autoLogout(expireDate)
      this.isLoggedIn.next(true)
      console.log("here aouto log in appears", this.userSubject.value)
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.isLoggedIn.next(false)
    this.cartService.clearCart()
    this.isAdminUser.next(false)
    localStorage.removeItem('admin')
    if (this.experationTimeInterval) {
      clearTimeout(this.experationTimeInterval)
    }
    this.experationTimeInterval = null
  }

  autoLogout(expirationDate: number) {
    this.experationTimeInterval = setTimeout(() => {
      this.logout()
    }, expirationDate);
  }

  signIn(email: string, password: string) {

    return this.http.post<Res>(`${environment.logInUrl}`, { email: email, password: password, returnSecureToken: true })
      .pipe(catchError(err => {
        let errorMessage = "Unknow Error Message";
        if (!err.error || !err.error.error) {
          return throwError(errorMessage);
        }
        switch (err.error.error.message) {
          case "EMAIL_NOT_FOUND":
            errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted.";
            break;

          case "INVALID_PASSWORD":
            errorMessage = "The password is invalid or the user does not have a password.";
            break;
          case "USER_DISABLED":
            errorMessage = "The user account has been disabled by an administrator.";
            break;
        }
        return throwError(errorMessage);
      }), tap(res => {
        localStorage.setItem('user', JSON.stringify(res));
        const timeToExpire = new Date(new Date().getDate() + +res.expiresIn * 1000)
        const user = new User(res.email, res.localId, res.idToken, timeToExpire)
        this.userSubject.next(user);
        this.isLoggedIn.next(true);
        this.autoLogout(+res.expiresIn * 1000)
        if (user.email == "hadi@gmail.com") {
          this.isAdminUser.next(true)
          localStorage.setItem('admin', 'true')
        }

      }))
  }

  addUser(user: UserReg) {
    console.log('user that has been added : ', user);

    return this.http.post<UserReg>(`${this.apiUrl}/users.json`, user).pipe(
      catchError((error: any) => {
        console.error('Error adding user:', error);
        throw error;
      })
    );
  }

}
