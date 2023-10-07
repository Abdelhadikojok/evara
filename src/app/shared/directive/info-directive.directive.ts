import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[info]'
})
export class InfoDirectiveDirective {

  @Input() text: string = "";
  private containerElement: HTMLElement | undefined; // Declare it with the correct type

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // Create a container <div> element
    this.containerElement = this.renderer.createElement('div');

    // Move existing content of the <a> element to the container
    // while (this.elementRef.nativeElement.firstChild) {
    //   this.renderer.appendChild(this.containerElement, this.elementRef.nativeElement.firstChild);
    // }

    // Create a <span> element
    const spanElement = this.renderer.createElement('span');

    // Create text node and set its content
    const textNode = this.renderer.createText(this.text);

    // Append the text node to the <span> element
    this.renderer.appendChild(spanElement, textNode);

    // Append the <span> element to the container
    this.renderer.appendChild(this.containerElement, spanElement);
  }

  @HostListener('mouseenter') onHover() {
    // This code will be executed when 'mouseenter' event occurs
    this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'relative');
    this.renderer.appendChild(this.elementRef.nativeElement, this.containerElement);

  }
  @HostListener('mouseleave') onHoverOut() {
    // This code will be executed when 'mouseenter' event occurs
    this.renderer.removeChild(this.elementRef.nativeElement, this.containerElement);
  }
}
