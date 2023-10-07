import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { IonicModule } from '@ionic/angular';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { SharedMModule } from '../shared-m/shared-m.module';


@NgModule({
    declarations: [
        AuthComponent,
        SignUpComponent,
        LogInComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        IonicModule,
        SharedMModule
    ]
})
export class AuthModule { }
