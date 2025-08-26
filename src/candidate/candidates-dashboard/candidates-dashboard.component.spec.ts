import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesDashboardComponent } from './candidates-dashboard.component';

describe('CandidatesDashboardComponent', () => {
  let component: CandidatesDashboardComponent;
  let fixture: ComponentFixture<CandidatesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatesDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
