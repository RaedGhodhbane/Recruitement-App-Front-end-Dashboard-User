import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesDetailComponent } from './candidates-detail.component';

describe('CandidatesDetailComponent', () => {
  let component: CandidatesDetailComponent;
  let fixture: ComponentFixture<CandidatesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
