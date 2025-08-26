import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCandidateComponent } from './profile-candidate.component';

describe('ProfileCandidateComponent', () => {
  let component: ProfileCandidateComponent;
  let fixture: ComponentFixture<ProfileCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
