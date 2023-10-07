import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartMenueComponent } from './cart-menue.component';

describe('CartMenueComponent', () => {
  let component: CartMenueComponent;
  let fixture: ComponentFixture<CartMenueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartMenueComponent]
    });
    fixture = TestBed.createComponent(CartMenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
