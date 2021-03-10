import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnternewpassComponent } from './enternewpass.component';

describe('EnternewpassComponent', () => {
  let component: EnternewpassComponent;
  let fixture: ComponentFixture<EnternewpassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnternewpassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnternewpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
