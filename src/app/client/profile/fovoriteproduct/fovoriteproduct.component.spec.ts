import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FovoriteproductComponent } from './fovoriteproduct.component';

describe('FovoriteproductComponent', () => {
  let component: FovoriteproductComponent;
  let fixture: ComponentFixture<FovoriteproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FovoriteproductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FovoriteproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
