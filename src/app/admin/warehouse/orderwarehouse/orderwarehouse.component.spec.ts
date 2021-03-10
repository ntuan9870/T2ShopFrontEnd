import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderwarehouseComponent } from './orderwarehouse.component';

describe('OrderwarehouseComponent', () => {
  let component: OrderwarehouseComponent;
  let fixture: ComponentFixture<OrderwarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderwarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderwarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
