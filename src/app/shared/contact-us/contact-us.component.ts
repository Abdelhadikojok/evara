import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/message';
import { environment } from 'src/environments/environment';
import * as alertify from 'alertifyjs'
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnDestroy {
  isloading: boolean = false;
  formData = {
    name: '',
    email: '',
    message: ''
  };
  private sendMessageSubscription !: Subscription;


  constructor(private http: HttpClient) { }

  submitForm(form: NgForm) {
    this.isloading = true;
    this.sendMessageSubscription = this.http.post<Message>(`${environment.apiUrl}/messages.json`, this.formData).subscribe(
      response => {
        console.log('Message sent successfully', response);
        this.isloading = false;
        form.reset()
        alertify.success('success sending message')

      },
      error => {
        console.error('Error sending message', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.sendMessageSubscription) {
      this.sendMessageSubscription.unsubscribe();
    }
  }
}
