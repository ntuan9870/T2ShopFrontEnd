import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntercodeComponent } from './entercode.component';

describe('EntercodeComponent', () => {
  let component: EntercodeComponent;
  let fixture: ComponentFixture<EntercodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntercodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntercodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
