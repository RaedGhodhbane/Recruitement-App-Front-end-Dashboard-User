import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMessagesCandidateComponent } from './manage-messages-candidate.component';

describe('ManageMessagesCandidateComponent', () => {
  let component: ManageMessagesCandidateComponent;
  let fixture: ComponentFixture<ManageMessagesCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMessagesCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMessagesCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
