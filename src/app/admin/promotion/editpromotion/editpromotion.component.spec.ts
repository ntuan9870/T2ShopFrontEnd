import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpromotionComponent } from './editpromotion.component';

describe('EditpromotionComponent', () => {
  let component: EditpromotionComponent;
  let fixture: ComponentFixture<EditpromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
