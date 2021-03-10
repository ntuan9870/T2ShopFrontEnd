import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddorderwarehouseComponent } from './addorderwarehouse.component';

describe('AddorderwarehouseComponent', () => {
  let component: AddorderwarehouseComponent;
  let fixture: ComponentFixture<AddorderwarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddorderwarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddorderwarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
