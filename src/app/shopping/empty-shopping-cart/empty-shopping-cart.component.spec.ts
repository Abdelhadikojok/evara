import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyShoppingCartComponent } from './empty-shopping-cart.component';

describe('EmptyShoppingCartComponent', () => {
  let component: EmptyShoppingCartComponent;
  let fixture: ComponentFixture<EmptyShoppingCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyShoppingCartComponent]
    });
    fixture = TestBed.createComponent(EmptyShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
