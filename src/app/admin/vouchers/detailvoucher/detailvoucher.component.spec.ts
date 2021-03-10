import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailvoucherComponent } from './detailvoucher.component';

describe('DetailvoucherComponent', () => {
  let component: DetailvoucherComponent;
  let fixture: ComponentFixture<DetailvoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailvoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailvoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
