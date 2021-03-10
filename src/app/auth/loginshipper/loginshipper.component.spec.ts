import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginshipperComponent } from './loginshipper.component';

describe('LoginshipperComponent', () => {
  let component: LoginshipperComponent;
  let fixture: ComponentFixture<LoginshipperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginshipperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginshipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
