import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordCandidateComponent } from './change-password-candidate.component';

describe('ChangePasswordCandidateComponent', () => {
  let component: ChangePasswordCandidateComponent;
  let fixture: ComponentFixture<ChangePasswordCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
