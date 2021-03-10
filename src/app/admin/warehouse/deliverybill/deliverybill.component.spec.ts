import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverybillComponent } from './deliverybill.component';

describe('DeliverybillComponent', () => {
  let component: DeliverybillComponent;
  let fixture: ComponentFixture<DeliverybillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverybillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
