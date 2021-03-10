import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorderwarehouseComponent } from './editorderwarehouse.component';

describe('EditorderwarehouseComponent', () => {
  let component: EditorderwarehouseComponent;
  let fixture: ComponentFixture<EditorderwarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorderwarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorderwarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
