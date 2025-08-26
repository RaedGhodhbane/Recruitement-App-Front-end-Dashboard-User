import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumePDFComponent } from './resume-pdf.component';

describe('ResumePDFComponent', () => {
  let component: ResumePDFComponent;
  let fixture: ComponentFixture<ResumePDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumePDFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumePDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
