import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { AboutUsComponent } from './shared/about-us/about-us.component';
import { ContactUsComponent } from './shared/contact-us/contact-us.component';
import { SharedMModule } from './shared-m/shared-m.module';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ScrollTopDirective } from './shared/directive/scroll-top.directive';
import { UnautherizedComponent } from './shared/unautherized/unautherized.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    ContactUsComponent,
    ScrollTopDirective,
    UnautherizedComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonicModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    SharedMModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
