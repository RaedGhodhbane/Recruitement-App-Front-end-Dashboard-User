import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterGridComponent } from './recruiter-grid.component';

describe('RecruiterGridComponent', () => {
  let component: RecruiterGridComponent;
  let fixture: ComponentFixture<RecruiterGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
