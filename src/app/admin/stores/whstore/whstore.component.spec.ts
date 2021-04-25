import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhstoreComponent } from './whstore.component';

describe('WhstoreComponent', () => {
  let component: WhstoreComponent;
  let fixture: ComponentFixture<WhstoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhstoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
