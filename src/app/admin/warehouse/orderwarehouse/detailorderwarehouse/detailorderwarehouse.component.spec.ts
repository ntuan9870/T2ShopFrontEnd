import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailorderwarehouseComponent } from './detailorderwarehouse.component';

describe('DetailorderwarehouseComponent', () => {
  let component: DetailorderwarehouseComponent;
  let fixture: ComponentFixture<DetailorderwarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailorderwarehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailorderwarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
