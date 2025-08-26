import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesDashboardHeaderComponent } from './candidates-dashboard-header.component';

describe('CandidatesDashboardHeaderComponent', () => {
  let component: CandidatesDashboardHeaderComponent;
  let fixture: ComponentFixture<CandidatesDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatesDashboardHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatesDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
