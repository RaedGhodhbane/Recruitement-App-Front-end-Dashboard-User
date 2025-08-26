import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterDashboardHeaderComponent } from './recruiter-dashboard-header.component';

describe('RecruiterDashboardHeaderComponent', () => {
  let component: RecruiterDashboardHeaderComponent;
  let fixture: ComponentFixture<RecruiterDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterDashboardHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
