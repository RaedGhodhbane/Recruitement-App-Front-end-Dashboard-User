import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMessagesRecruiterComponent } from './manage-messages-recruiter.component';

describe('ManageMessagesRecruiterComponent', () => {
  let component: ManageMessagesRecruiterComponent;
  let fixture: ComponentFixture<ManageMessagesRecruiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMessagesRecruiterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMessagesRecruiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
