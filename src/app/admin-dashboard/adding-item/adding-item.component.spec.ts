import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingItemComponent } from './adding-item.component';

describe('AddingItemComponent', () => {
  let component: AddingItemComponent;
  let fixture: ComponentFixture<AddingItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddingItemComponent]
    });
    fixture = TestBed.createComponent(AddingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
