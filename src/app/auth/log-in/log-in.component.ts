import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as alertify from 'alertifyjs'

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnDestroy {
    private authSubscription !: Subscription;
    loginValue: boolean = false;
    error: string = "";
    isloading: boolean = false;
    islogedIn: boolean = false;
    sginUpText: string = '';

    constructor(private authService: AuthService, private router: Router) {

    }

    removeError() {
        this.error = ""
    }

    changeLogedValue() {
        this.loginValue = !this.loginValue

    }

    submitForm(form: any) {
        if (form.valid) {
            const email = form.value.email;
            const password = form.value.password;
            this.isloading = true;
            this.authSubscription = this.authService.signIn(email, password).subscribe(res => {
                console.log(res)
                alertify.success('login success');
                this.router.navigate(['/'])
                this.islogedIn = true
                this.isloading = false;
            }, err => {
                alertify.error('login Faild');
                this.error = err;
                this.isloading = false;
            })
            form.reset();

        }
    }

    ngOnDestroy(): void {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
    }
}

