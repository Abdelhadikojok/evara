import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeShoppingItemComponent } from './home-shopping-item.component';

describe('HomeShoppingItemComponent', () => {
  let component: HomeShoppingItemComponent;
  let fixture: ComponentFixture<HomeShoppingItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeShoppingItemComponent]
    });
    fixture = TestBed.createComponent(HomeShoppingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
