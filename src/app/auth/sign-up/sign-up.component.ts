import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as alertify from 'alertifyjs'

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
    loginValue: boolean = false;
    error: string = "";
    isloading: boolean = false;
    islogedIn: boolean = false;
    sginUpText: string = '';
    userId: string = ''

    constructor(private authService: AuthService, private router: Router) {

    }


    ngOnInit(): void {
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
            ;

            const user = {
                email: form.value.email,
                username: `${form.value.firstName} ${form.value.lastName[0]}`,
                name: {
                    firstname: form.value.firstName,
                    lastname: form.value.lastName
                },
                address: {
                    country: form.value.address
                },
                phone: form.value.phone
            }

            console.log(form.value)

            this.authService.signUp(email, password).pipe(
                switchMap((res) => {
                    alertify.success('SignUp Success');
                    console.log('sign-up response:', res);
                    this.userId = res.localId;
                    this.router.navigate(['/']);
                    this.islogedIn = true;
                    this.isloading = false;
                    return this.authService.addUser({ id: res.localId, ...user });
                }),
            )
                .subscribe(
                    (userAddResponse) => {
                        console.log('User added:', userAddResponse);
                    },
                    (err) => {
                        alertify.error('SignUp failed');
                        this.error = err.message;
                        this.isloading = false;
                    }
                );
            form.reset();

        }
    }
}





