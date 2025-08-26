import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedJobsCandidateComponent } from './saved-jobs-candidate.component';

describe('SavedJobsCandidateComponent', () => {
  let component: SavedJobsCandidateComponent;
  let fixture: ComponentFixture<SavedJobsCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedJobsCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedJobsCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
