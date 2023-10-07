import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appScrollTop]'
})
export class ScrollTopDirective {
  constructor(private router: Router) { }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    window.scrollTo(0, 0); // Scroll to the top

  }
}
