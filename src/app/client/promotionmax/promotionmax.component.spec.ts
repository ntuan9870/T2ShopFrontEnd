import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionmaxComponent } from './promotionmax.component';

describe('PromotionmaxComponent', () => {
  let component: PromotionmaxComponent;
  let fixture: ComponentFixture<PromotionmaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionmaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionmaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
