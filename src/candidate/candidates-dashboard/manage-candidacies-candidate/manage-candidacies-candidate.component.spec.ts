import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJobsCandidateComponent } from './manage-candidacies-candidate.component';

describe('ManageJobsCandidateComponent', () => {
  let component: ManageJobsCandidateComponent;
  let fixture: ComponentFixture<ManageJobsCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageJobsCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageJobsCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
