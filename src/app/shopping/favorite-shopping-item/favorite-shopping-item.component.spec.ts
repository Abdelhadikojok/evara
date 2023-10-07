import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteShoppingItemComponent } from './favorite-shopping-item.component';

describe('FavoriteShoppingItemComponent', () => {
  let component: FavoriteShoppingItemComponent;
  let fixture: ComponentFixture<FavoriteShoppingItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteShoppingItemComponent]
    });
    fixture = TestBed.createComponent(FavoriteShoppingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
