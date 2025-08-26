import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordRecruiterComponent } from './change-password-recruiter.component';

describe('ChangePasswordRecruiterComponent', () => {
  let component: ChangePasswordRecruiterComponent;
  let fixture: ComponentFixture<ChangePasswordRecruiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordRecruiterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
